import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "../styles/PropertyDetails.css"; // ✅ Import CSS separately

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error.message);
        setErrorMessage("Property not found or unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="loading-text">Loading property details...</p>;
  if (!property) return <p className="error-text">{errorMessage}</p>;

  return (
    <div className="property-details-container">
      <button onClick={() => navigate(-1)} className="back-button">⬅️ Back</button>
      <img
        src={property.image_url || "/placeholder.jpg"}
        alt={property.title || "Property Image"}
        className="property-image"
        onError={(e) => (e.target.src = "/placeholder.jpg")}
      />
      <h1>{property.title || "Unnamed Property"}</h1>
      <p><strong>Location:</strong> {property.location || "Unknown"}</p>
      <p><strong>Price:</strong> ${property.price || "N/A"}</p>
      <p><strong>Description:</strong> {property.description || "No description available."}</p>
      <button className="contact-button">Contact Landlord</button>
    </div>
  );
}
