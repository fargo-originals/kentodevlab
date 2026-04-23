import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/admin-supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, budget, message } = body;

    if (!name || !email || !service || !budget || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('mensajes_contacto')
      .insert({
        nombre: name,
        email,
        telefono: phone || null,
        empresa: company || null,
        servicio: service,
        presupuesto: budget,
        mensaje: message,
        leido: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Error al guardar mensaje' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}