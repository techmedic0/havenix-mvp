import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aphgousoquxhervcjejd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaGdvdXNvcXV4aGVydmNqZWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0OTIyMzgsImV4cCI6MjA1NjA2ODIzOH0.4qluZRLanG_vmmAjEE-FAhxsoDyX2WkML7sR2_NHRAg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

//listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Event:", event)
  console.log("Session:", session)
})