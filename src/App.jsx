import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import AddProperty from "./components/AddProperty";
import ScrollToTop from "./components/scrollToTop";
import PropertyDetails from "./components/PropertyDetails";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        setLoading(false);
        return;
      }

      const user = data?.session?.user || null;
      console.log("Fetched user:", user);  // Debugging
      console.log("User role from metadata:", user?.user_metadata?.role);  // Debugging

      if (user) {
        setUser(user);
        setRole(user.user_metadata?.role || null);
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        console.log("Auth state changed - User logged in:", session.user);
        setUser(session.user);
        setRole(session.user.user_metadata?.role || null);
      } else {
        console.log("Auth state changed - User logged out");
        setUser(null);
        setRole(null);
      }
    });

    return () => authListener?.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <AuthForm />} />
        <Route path="/dashboard" element={user ? <Dashboard role={role} /> : <Navigate to="/" />} />
        <Route path="/add-property" element={user && role === "landlord" ? <AddProperty /> : <Navigate to="/" />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
}
