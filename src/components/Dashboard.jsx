import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.email || "User"}!</h2>
      <p>This is your dashboard.</p>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </div>
  );
};

export default Dashboard;
