import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from './prisma';

export const ADMIN_COOKIE_NAME = 'pinddaan_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

const DEFAULT_SECRET = 'pinddaanwale_secure_secret_auth_key_2026_gaya_ji_jwt';

function getSecretKey(): string {
  return process.env.AUTH_SECRET || DEFAULT_SECRET;
}

export interface AdminSessionPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

// Helpers for Base64URL encoding/decoding without external dependencies
function base64UrlEncode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64url');
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64url').toString('utf-8');
  }
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(bytes).toString('base64url');
  }
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToArrayBuffer(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Sign session payload using HMAC-SHA256 (Web Crypto - Edge & Node compatible)
 */
export async function signSessionToken(payload: Omit<AdminSessionPayload, 'exp' | 'iat'>): Promise<string> {
  const enc = new TextEncoder();
  const secretKey = getSecretKey();
  
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_MAX_AGE;
  
  const fullPayload: AdminSessionPayload = {
    ...payload,
    iat,
    exp,
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(dataToSign));
  const encodedSignature = arrayBufferToBase64Url(signature);

  return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verify session token and return payload if valid, null otherwise
 */
export async function verifySessionToken(token?: string | null): Promise<AdminSessionPayload | null> {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;
    const enc = new TextEncoder();
    const secretKey = getSecretKey();

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      enc.encode(secretKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBytes = base64UrlToArrayBuffer(encodedSignature);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureBytes as any,
      enc.encode(dataToVerify)
    );

    if (!isValid) return null;

    const payloadText = base64UrlDecode(encodedPayload);
    const payload: AdminSessionPayload = JSON.parse(payloadText);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTimestamp) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Simple password hash using SHA-256 with salt
 */
export function hashPasswordWithSalt(password: string, salt: string = 'pinddaan_salt'): string {
  const enc = new TextEncoder();
  const data = enc.encode(password + ':' + salt);
  // Node crypto or fallback
  if (typeof require !== 'undefined') {
    try {
      const cryptoNode = require('crypto');
      return cryptoNode.createHash('sha256').update(password + ':' + salt).digest('hex');
    } catch (_) {}
  }
  return password; // Fallback if crypto isn't available
}

/**
 * Verify admin credentials against DB UserAdmin and .env master credentials
 */
export async function verifyAdminCredentials(
  emailInput: string,
  passwordInput: string
): Promise<{ success: boolean; error?: string; user?: any }> {
  const cleanEmail = (emailInput || '').trim().toLowerCase();
  const cleanPassword = (passwordInput || '').trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: 'Email and Password are required.' };
  }

  const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@pinddaanwale.com').trim().toLowerCase();
  const envAdminPassword = (process.env.ADMIN_PASSWORD || 'Pinddaan@Admin2026').trim();

  // 1. Check Master .env credentials first
  if (cleanEmail === envAdminEmail && cleanPassword === envAdminPassword) {
    try {
      // Ensure record exists in UserAdmin table for audit & consistency
      const existingUser = await (prisma as any).userAdmin.findUnique({
        where: { email: envAdminEmail },
      });

      if (!existingUser) {
        await (prisma as any).userAdmin.create({
          data: {
            name: 'PindDaanWale Super Admin',
            email: envAdminEmail,
            password: hashPasswordWithSalt(envAdminPassword),
            role: 'SUPER_ADMIN',
          },
        });
      }

      return {
        success: true,
        user: {
          id: existingUser ? existingUser.id : 'super-admin-root',
          email: envAdminEmail,
          name: existingUser ? existingUser.name : 'Super Admin',
          role: 'SUPER_ADMIN',
        },
      };
    } catch (dbErr) {
      console.warn('DB UserAdmin check warning:', dbErr);
      // Even if DB has an issue, allow master .env login
      return {
        success: true,
        user: {
          id: 'super-admin-env',
          email: envAdminEmail,
          name: 'Super Admin',
          role: 'SUPER_ADMIN',
        },
      };
    }
  }

  // 2. Check in database UserAdmin table
  try {
    const user = await (prisma as any).userAdmin.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const hashedInput = hashPasswordWithSalt(cleanPassword);
    const isPasswordMatch = user.password === hashedInput || user.password === cleanPassword;

    if (!isPasswordMatch) {
      return { success: false, error: 'Invalid email or password.' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'ADMIN',
      },
    };
  } catch (err: any) {
    console.error('Error verifying admin credentials:', err);
    return { success: false, error: 'Authentication failed. Please try again.' };
  }
}

/**
 * Set HTTP-Only Secure Cookie
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Get current session from cookie
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

/**
 * Clear session cookie
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Server Guard: redirects to /admin/login if not authenticated
 */
export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}
