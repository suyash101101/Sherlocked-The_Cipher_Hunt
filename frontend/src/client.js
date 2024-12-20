
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://efcastawdxpnkeqlaeea.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmY2FzdGF3ZHhwbmtlcWxhZWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NTUwMjQsImV4cCI6MjA1MDEzMTAyNH0.KdM3D0tqqXj-iJfwFJw17nH0QKpSXN6wjlbcYHJPFt8'
export const supabase = createClient(supabaseUrl, supabaseKey)
