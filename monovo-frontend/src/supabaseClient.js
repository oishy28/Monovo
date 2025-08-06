import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkyydyneydqfjtkbdhcq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRreXlkeW5leWRxZmp0a2JkaGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTMyNDksImV4cCI6MjA2OTc4OTI0OX0.jjw0Il4qG7AllL7ePmguR-K3avr6ufvXtoHOMmNa4oo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
