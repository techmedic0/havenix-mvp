import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import "../styles/BookingRequest.css"; // Import CSS File

const BookingRequest = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [moveInDate, setMoveInDate] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();
      if (!error) setProperty(data);
    };
    fetchProperty();
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fetch user session
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    console.log("User Data:", userData); // Debugging
  
    if (userError || !userData?.user) {
      alert("You need to be logged in to request a booking.");
      return;
    }
  
    const studentId = userData.user.id;
  
    const { error } = await supabase.from("booking_requests").insert([
      {
        student_id: studentId,
        landlord_id: property?.landlord_id,
        property_id: propertyId,
        status: "Pending",
        message,
        created_at: new Date(),
      },
    ]);
  
    if (error) {
      alert("Error submitting request: " + error.message);
    } else {
      alert("Booking request sent!");
      navigate("/");
    }
  };
  

  return (
    <div className="container">
      {property ? (
        <div>
          <h2>
            <span>Request to Book:</span>
             {property.title}
          </h2>
          <p>📍 {property.location}</p>
          <p>💰 ${property.price}</p>
          <form onSubmit={handleSubmit}>
            <label>Move-in Date:</label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              required
            />

            <label>Duration (months):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />

            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button type="submit">Send Request</button>
          </form>
        </div>
      ) : (
        <p>Loading property...</p>
      )}
    </div>
  );
};

export default BookingRequest;
