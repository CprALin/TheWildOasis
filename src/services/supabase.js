
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qaptummpvtensroqyfbn.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhcHR1bW1wdnRlbnNyb3F5ZmJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjc3OTcwMCwiZXhwIjoyMDM4MzU1NzAwfQ.p6cGJyh0AaB6ixLrU1Z_pIXu64xdY259x4r469a2eIg`;
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;