import { supabase } from "./utils/supabaseClient";

// Signup function with email confirmation and user insertion into 'users' table
export const signUp = async (email, password, name, role) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm", // Adjust for production
      data: { role, name }, // Store role and name in user metadata
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
    throw error;
  }

  console.log("Signup response:", data);

  if (data?.user?.id) {
    console.log("User exists, inserting into users table...");
    const { error: insertError } = await supabase.from("users").insert([
      { user_id: data.user.id, email, name, role },
    ]);

    if (insertError) console.error("Error inserting user:", insertError.message);
  } else {
    console.warn("User ID is null. Waiting for email confirmation.");
  }

  return data;
};

// Sign-in function with automatic user insertion if missing
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    throw error;
  }

  console.log("Login response:", data);

  if (data?.user?.id) {
    console.log("Checking if user exists in users table...");
    /* const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .single(); */
      const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .single({ headers: { Accept: "application/json" } }); // Add this
    


    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking user:", checkError.message);
    }

    if (!existingUser) {
      console.log("User missing, inserting into users table...");
      const { error: insertError } = await supabase.from("users").insert([
        {
          user_id: data.user.id,
          email,
          name: data.user.user_metadata?.name || "Unknown",
          role: data.user.user_metadata?.role || "student",
        },
      ]);

      if (insertError) console.error("Error inserting user:", insertError.message);
    }
  }

  return data;
};

// Sign-out function
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign-out error:", error.message);
    throw error;
  }
};

// Get current user
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user error:", error.message);
    throw error;
  }

  console.log("Current user:", data.user);
  return data.user;
};
