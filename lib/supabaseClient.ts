import { createClient } from '@supabase/supabase-js';

// Support both Vite custom prefix and Next.js / generic process.env variables.
// This is extremely safe and prevents build or runtime exceptions.
const supabaseUrl = 
  ((import.meta as any).env?.VITE_SUPABASE_URL as string) || 
  ((typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) as string) ||
  '';

const supabaseAnonKey = 
  ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string) || 
  ((typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) as string) ||
  '';

// Default mock values if keys are not configured yet, so the app compiles without throwing.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase Client Setup] Warning: Supabase environment credentials are not declared in .env file. Direct fetches will fall back to local persistence.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-anon-key'
);
