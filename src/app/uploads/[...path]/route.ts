import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// MIME type lookup
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.pdf': 'application/pdf',
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await context.params;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse('Not found', { status: 404 });
    }

    // Sanitize path segments to prevent directory traversal
    const safeSegments = pathSegments.map((s) => s.replace(/\.\./g, ''));
    const relativePath = safeSegments.join('/');

    // Statically scoped directory to prevent full-project tracing
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const targetFilePath = path.join(uploadsDir, ...safeSegments);

    if (!fs.existsSync(targetFilePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(targetFilePath);
    const ext = path.extname(targetFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
