export const ADMIN_COOKIE_NAME = 'pinddaan_admin_session';
const DEFAULT_SECRET = 'pinddaanwale_secure_secret_auth_key_2026_gaya_ji_jwt';

export interface AdminSessionPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

function getSecretKey(): string {
  return process.env.AUTH_SECRET || DEFAULT_SECRET;
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
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
 * Pure Web Crypto token verification - 100% compatible with Edge runtime and Middleware
 */
export async function verifySessionTokenEdge(token?: string | null): Promise<AdminSessionPayload | null> {
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
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}
