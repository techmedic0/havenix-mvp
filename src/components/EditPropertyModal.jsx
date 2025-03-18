import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import "../styles/EditPropertyModal.css";

export default function EditPropertyModal({ property, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: property.title,
    location: property.location,
    price: property.price,
    description: property.description,
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoadingUpdate(true);
      const { error } = await supabase
        .from("properties")
        .update(formData)
        .eq("id", property.id);
  
      if (error) throw error;
  
      await onUpdate(); // ✅ Wait for UI update
      setTimeout(onClose, 300); // ✅ Ensure UI updates before closing
    } catch (error) {
      console.error("Error updating property:", error.message);
    } finally {
      setLoadingUpdate(false);
    }
  };
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
  
    try {
      setLoadingDelete(true);
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", property.id);
  
      if (error) throw error;
  
      await onUpdate(); // ✅ Wait for UI update
      setTimeout(onClose, 300); // ✅ Ensure UI updates before closing
    } catch (error) {
      console.error("Error deleting property:", error.message);
    } finally {
      setLoadingDelete(false);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Property</h2>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />

        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <div className="modal-buttons">
          <button className="save-button" onClick={handleUpdate} disabled={loadingUpdate}>
            {loadingUpdate ? "Saving..." : "Save Changes"}
          </button>
          <button className="delete-button" onClick={handleDelete} disabled={loadingDelete}>
            {loadingDelete ? "Deleting..." : "Delete Property"}
          </button>
          <button className="close-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
