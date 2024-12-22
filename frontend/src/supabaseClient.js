import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sroeexbdokczmzngdmte.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb2VleGJkb2tjem16bmdkbXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjMyNTEsImV4cCI6MjA1MDI5OTI1MX0.IEsAZs_1Mcz9lanJ7w9PC-PTwktOOWwGXtk7PlBZpPY'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
