import { createClient } from "@supabase/supabase-js";
import { Database } from "../_types/SupabaseTypes";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_KEY environment variable");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
