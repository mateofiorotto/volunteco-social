import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'FROM ENV';
const SUPABASE_KEY = 'FROM ENV';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);