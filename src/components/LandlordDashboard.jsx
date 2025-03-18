import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import EditPropertyModal from "./EditPropertyModal";
import "../styles/LandlordDashboard.css"; // ✅ Importing the CSS file

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []); // ✅ Now calling fetchProperties separately

  // ✅ Fetch Properties (Moved Outside useEffect for Reusability)
  const fetchProperties = async () => {
    setLoading(true);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    
    const landlordId = userData?.user?.id;
    if (!landlordId) return;
    
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("landlord_id", landlordId);

    if (error) {
      console.error("Error fetching properties:", error.message);
    } else {
      setProperties(data);
    }
    setLoading(false);
  };

  // ✅ Delete Property and Refresh List
  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("properties").delete().eq("id", propertyId);
    if (error) {
      console.error("Error deleting property:", error.message);
    } else {
      await fetchProperties(); // ✅ Fetch updated list after deletion
    }
  };

  // ✅ Open Modal with Selected Property
  const handleEdit = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="dashboard-container">
      <h1 className="title">Landlord Dashboard</h1>
      <p className="subtitle">Welcome, Landlord! Manage your properties here.</p>
      <div className="button-group">
        <button className="primary-button" onClick={() => navigate("/add-property")}>
          Add Property
        </button>
        <button className="secondary-button" onClick={() => supabase.auth.signOut()}>
          Log Out
        </button>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties added yet.</p>
      ) : (
        <div className="property-list">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <h2>{property.title}</h2>
              <p>{property.location}</p>
              <p>Price: ${property.price}</p>
              <button className="edit-button" onClick={() => handleEdit(property)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(property.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedProperty && (
        <EditPropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onUpdate={async () => {
            await fetchProperties(); // ✅ Fetch latest properties from DB
            setSelectedProperty(null); // ✅ Close modal after update
          }}
        />
      )}
    </div>
  );
}
