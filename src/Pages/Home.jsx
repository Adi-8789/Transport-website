import Hero from "../components/Hero";
import VehicleSelector from "../components/VehicleSelector";
import LocationSelector from "../components/LocationSelector";
import { useState } from "react";
import Contact from "../components/Contact";

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <>
      {/* Vehicle Selection Section */}
      <section id="vehicles">
        <VehicleSelector setSelectedVehicle={setSelectedVehicle} />
      </section>

      {/* Location & Fare Calculation Section */}
      <section id="book">
        <LocationSelector selectedVehicle={selectedVehicle} />
      </section>
      <Contact/>
    </>
  );
}
