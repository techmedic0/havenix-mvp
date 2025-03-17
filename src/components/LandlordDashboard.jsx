import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "../styles/LandlordDashboard.css"; // ✅ Importing the CSS file

export default function LandlordDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="title">Landlord Dashboard</h1>
      <p className="subtitle">Welcome, Landlord! Add your properties here.</p>
      <div className="button-group">
        <button className="primary-button" onClick={() => navigate("/add-property")}>
          Add Property
        </button>
        <button className="secondary-button" onClick={() => supabase.auth.signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
}
