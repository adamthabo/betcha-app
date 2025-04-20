import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug log to verify these exist
console.log("🔑 Supabase URL:", supabaseUrl);
console.log("🔑 Supabase Anon Key:", supabaseAnonKey ? "Loaded" : "Missing!");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
