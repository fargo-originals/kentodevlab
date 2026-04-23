import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vocivfptysryarpgpxdf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvY2l2ZnB0eXNyeWFycGdweGRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk0OTE4MywiZXhwIjoyMDkyNTI1MTgzfQ.3Ae_EGkkFryXWC5gbdgIgUpYbf34-OX-78HGrjsYAQE';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function verifyAdmin(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) return { success: false, error: error.message };
  
  return { success: true, user: data.user };
}

export async function signOut() {
  const { error } = await supabaseAdmin.auth.signOut();
  if (error) return { success: false, error: error.message };
  return { success: true };
}