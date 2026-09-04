import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename: extract extension and sanitize base name
    const ext = path.extname(file.name).toLowerCase() || (file.type.startsWith('video/') ? '.mp4' : '.jpg');
    const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const cleanBase = rawBase.slice(0, 50) || 'upload';
    const filename = `${Date.now()}_${cleanBase}${ext}`;

    // Target 1: Root public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, filename), buffer);

    // Target 2: Standalone .next/standalone/public/uploads (if running in standalone mode)
    try {
      const standaloneUploadsDir = path.join(process.cwd(), '.next', 'standalone', 'public', 'uploads');
      await mkdir(standaloneUploadsDir, { recursive: true });
      await writeFile(path.join(standaloneUploadsDir, filename), buffer);
    } catch {
      // ignore if not running in standalone structure
    }

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: filename,
      fileType: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE'
    });
  } catch (error: any) {
    console.error('File upload route error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
