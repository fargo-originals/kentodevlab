import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/admin-supabase';

export async function POST(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session');
  const adminAuth = request.headers.get('x-admin-auth');
  
  if ((!adminSession || adminSession.value !== 'true') && adminAuth !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const { data, error } = await supabaseAdmin.storage
      .from('uploads')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('uploads')
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}