import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "../styles/StudentDashboard.css"; // ✅ Import CSS separately

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("id, title, location, price, description, image_url");

        if (error) throw error;

        setProperties(
          data.map((property) => ({
            ...property,
            image_url: property.image_url || "/placeholder.jpg",
            description: property.description || "No description available",
          }))
        );
      } catch (error) {
        console.error("Error fetching properties:", error.message);
        setErrorMessage("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Student Dashboard</h1>
      <h2>Available Properties</h2>

      {loading ? (
        <p className="loading-text">Loading properties...</p>
      ) : errorMessage ? (
        <p className="error-text">{errorMessage}</p>
      ) : (
        <div className="property-grid">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="property-card">
                <img
                  src={property.image_url}
                  alt={property.title || "Property Image"}
                  className="property-image"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <h3>{property.title || "Unnamed Property"}</h3>
                <p>{property.description}</p>
                <p>
                  <strong>Location:</strong> {property.location || "Unknown"}
                </p>
                <p>
                  <strong>Price:</strong> ${property.price || "N/A"}
                </p>
                <button onClick={() => navigate(`/property/${property.id}`)}>View Details</button>
              </div>
            ))
          ) : (
            <p className="no-properties">No properties available.</p>
          )}
        </div>
      )}
      <button onClick={() => supabase.auth.signOut()} className="logout-button">
        Log Out
      </button>
    </div>
  );
}
