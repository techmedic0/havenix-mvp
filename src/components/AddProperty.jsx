import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/AddProperty.css"; // ✅ Importing the CSS file

export default function AddProperty() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); 
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Uploading property...");

    try {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        setMessage("You must be logged in to add a property.");
        setLoading(false);
        return;
      }

      let imageUrl = "";
      if (image) {
        const fileName = `${user.id}/${Date.now()}-${image.name}`;
        console.log("Uploading file:", fileName);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, image, { upsert: false });

        if (uploadError) {
          console.error("Upload Error:", uploadError);
          throw new Error("Image upload failed: " + uploadError.message);
        }

        if (uploadData?.path) {
          imageUrl = supabase.storage
            .from("property-images")
            .getPublicUrl(uploadData.path).data.publicUrl;
        }
      }

      const { error: insertError } = await supabase.from("properties").insert([
        { 
          title, 
          location, 
          price: Number(price), 
          description, 
          image_url: imageUrl, 
          landlord_id: user.id,
        }
      ]);

      if (insertError) throw insertError;

      setMessage("✅ Property added successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "❌ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <h1 className="title">Add Property</h1>
      <form className="property-form" onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Title" value={title} 
          onChange={(e) => setTitle(e.target.value)} required 
        />
        <input 
          type="text" placeholder="Location" value={location} 
          onChange={(e) => setLocation(e.target.value)} required 
        />
        <input 
          type="number" placeholder="Price" value={price} 
          onChange={(e) => setPrice(e.target.value)} required 
        />
        <textarea 
          placeholder="Description" value={description} 
          onChange={(e) => setDescription(e.target.value)} required
        ></textarea>
        <input 
          type="file" accept="image/png, image/jpeg, image/jpg" 
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.size > 5 * 1024 * 1024) {
              setMessage("❌ File size too large (Max: 5MB)");
              return;
            }
            setImage(file);
          }} 
        />
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Property"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
