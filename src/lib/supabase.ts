import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vocivfptysryarpgpxdf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvY2l2ZnB0eXNyeWFycGdweGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDkxODMsImV4cCI6MjA5MjUyNTE4M30.iq2TPPsPDmrZdPobK-PVDjMQPq6Nkt502FUrbkX9CTM';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvY2l2ZnB0eXNyeWFycGdweGRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk0OTE4MywiZXhwIjoyMDkyNTI1MTgzfQ.3Ae_EGkkFryXWC5gbdgIgUpYbf34-OX-78HGrjsYAQE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);