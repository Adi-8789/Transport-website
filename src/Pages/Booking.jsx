import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Booking.css";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const { vehicle, pickup, destination, distance, fare } = location.state || {};

  // Add form fields for customer info
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");

  if (!vehicle || !pickup || !destination) {
    return (
      <div className="booking-section">
        <h2>No booking details found</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const handleWhatsAppBooking = () => {
    if (!name || !contact || !date) {
      alert("Please fill in your name, contact number, and pickup date.");
      return;
    }

    const message = `🚗 *Aditya Transport Booking*\n\nName: ${name}\nContact: ${contact}\nPickup Date: ${date}\n\nVehicle: ${vehicle.name}\nPickup: ${pickup}\nDestination: ${destination}\nDistance: ${distance} km\nFare: ₹${fare}\n\nPlease confirm this booking.`;

    const phone = "918789271490"; // Owner's WhatsApp number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="booking-section">
      <h2>Confirm Your Booking</h2>
      <div className="booking-card">
        <p><strong>Vehicle:</strong> {vehicle.name}</p>
        <p><strong>Pickup:</strong> {pickup}</p>
        <p><strong>Destination:</strong> {destination}</p>
        <p><strong>Distance:</strong> {distance} km</p>
        <p><strong>Fare:</strong> ₹{fare}</p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="confirm-btn" onClick={handleWhatsAppBooking}>
          Confirm via WhatsApp
        </button>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Modify Details
        </button>
      </div>
    </section>
  );
}
