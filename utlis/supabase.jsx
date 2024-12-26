import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://kqigzgbvdhjlyonhpsze.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxaWd6Z2J2ZGhqbHlvbmhwc3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjU3NDUsImV4cCI6MjA1MDgwMTc0NX0.9B-1JO9G-SWxP_ds37Gk9nIXwHF9xT2WG5biUQruH60"
);
