import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import LandlordDashboard from "./LandlordDashboard";
import StudentDashboard from "./StudentDashboard";

export default function Dashboard({ role }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    if (!role) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [role, navigate]);

  if (loading) return <p>Loading user data...</p>;

  return role === "landlord" ? <LandlordDashboard /> : <StudentDashboard />;
}
