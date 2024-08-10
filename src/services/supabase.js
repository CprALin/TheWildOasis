
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qaptummpvtensroqyfbn.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhcHR1bW1wdnRlbnNyb3F5ZmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3Nzk3MDAsImV4cCI6MjAzODM1NTcwMH0.oEaziRXfunifXKmyAt9ZIikkAfhBryzM2rFxwazBBK8`;
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;