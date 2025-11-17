import { useState } from "react";
import "./VehicleSelector.css";

export default function VehicleSelector({ setSelectedVehicle }) {
  const [selected, setSelected] = useState("");

  const vehicles = [
    {
      id: "mini",
      name: "Sedan",
      price: 10,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ80hPlgCPR6AlwLPgIn07k2PPywoP7RQIn4g&s",
    },
    {
      id: "suv",
      name: "SUV",
      price: 15,
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMeQh910B7nqAswIKviEk_lS0hl3KrM4cIQ&s",
    },
    {
      id: "pickup",
      name: "Pickup Van",
      price: 20,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQilsMyZALEPEbwXQ0_AucVabd5F8OLLScMpw&s",
    },
  ];

  const handleSelect = (vehicle) => {
    setSelected(vehicle.id);
    setSelectedVehicle(vehicle); // 🔹 send selected vehicle details to Home.jsx
  };

  return (
    <section className="vehicle-section">
      <h2>Select Your Vehicle</h2>
      <div className="vehicle-container">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className={`vehicle-card ${selected === v.id ? "selected" : ""}`}
            onClick={() => handleSelect(v)}
          >
            <img src={v.img} alt={v.name} />
            <h3>{v.name}</h3>
            <p>₹{v.price} / km</p>
          </div>
        ))}
      </div>
    </section>
  );
}
