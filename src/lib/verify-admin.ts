import { supabaseAdmin } from './admin-supabase';

interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  nombre: string;
  creado_en: string;
}

export async function getAdminUser(email: string): Promise<AdminUser | null> {
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) return null;
  return data as AdminUser;
}

export async function verifyAdminPassword(email: string, password: string): Promise<{valid: boolean; admin?: AdminUser}> {
  const admin = await getAdminUser(email);
  
  if (!admin) return { valid: false };
  
  const bcrypt = require('bcryptjs');
  const valid = await bcrypt.compare(password, admin.password_hash);
  
  if (valid) return { valid: true, admin };
  return { valid: false };
}