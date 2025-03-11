import { supabase } from "./utils/supabaseClient";

//signup function
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

//signin function
export const signIn = async (email, password) => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

//signout function
export const signOut = async () => {
  const {error} = await supabase.auth.signOut();
  if (error) throw error;
}

//get current user
export const getUser = async () => {
  const { data: [ user ] } = await supabase.auth.getUser();
  return user;
}