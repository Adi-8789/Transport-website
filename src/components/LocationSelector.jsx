import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LocationSelector.css";

export default function LocationSelector({ selectedVehicle }) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiKey =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImE2NGVhNjMyYjhkMTQ1YWJhNmQ4ZGIyMTFhMDBmZDQwIiwiaCI6Im11cm11cjY0In0=";

  const handleSuggestion = async (value, type) => {
    if (!value) {
      if (type === "pickup") setPickupSuggestions([]);
      else setDestinationSuggestions([]);
      return;
    }

    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: value,
        format: "json",
        limit: 8,
        addressdetails: 1,
        countrycodes: "in",
      });

    try {
      const res = await fetch(url, {
        headers: { "Accept-Language": "en" },
      });

      const data = await res.json();

      const refined = data
        .map((item) => ({
          display_name: item.display_name,
          lat: item.lat,
          lon: item.lon,
          importance: item.importance,
        }))
        .sort((a, b) => b.importance - a.importance);

      if (type === "pickup") setPickupSuggestions(refined);
      else setDestinationSuggestions(refined);
    } catch (err) {
      console.error("Nominatim error:", err);
    }
  };

  const getCoords = async (place) => {
    const encoded = encodeURIComponent(place);
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encoded}&boundary.country=IND&size=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch coordinates");
    const data = await res.json();
    return data.features[0]?.geometry?.coordinates;
  };

  const calculateDistance = async () => {
    try {
      if (!pickup || !destination) {
        setError("Please enter both locations.");
        return;
      }
      if (!selectedVehicle) {
        setError("Please select a vehicle first.");
        return;
      }

      setError("");
      setLoading(true);
      setDistance(null);
      setFare(null);

      const start = await getCoords(pickup);
      const end = await getCoords(destination);

      if (!start || !end) {
        setError("Unable to find one or both locations.");
        setLoading(false);
        return;
      }

      const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`;
      const routeRes = await fetch(routeUrl);

      if (!routeRes.ok) throw new Error("Failed to fetch distance");

      const routeData = await routeRes.json();

      const dist = routeData.features[0].properties.summary.distance / 1000;
      setDistance(dist.toFixed(2));

      const total = dist * selectedVehicle.price;
      setFare(total.toFixed(2));
    } catch (err) {
      console.error("Error fetching distance:", err);
      setError("Error fetching distance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="location-section">
      <h2>Calculate Distance & Fare</h2>

      {selectedVehicle ? (
        <div className="selected-info">
          <p>
            <strong>Vehicle:</strong> {selectedVehicle.name}
          </p>
          <p>
            <strong>Rate:</strong> ₹{selectedVehicle.price} / km
          </p>
        </div>
      ) : (
        <p className="error">Select a vehicle above to proceed.</p>
      )}

      <div className="location-inputs">
        
        {/* PICKUP INPUT */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              handleSuggestion(e.target.value, "pickup");
            }}
          />

          {pickupSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {pickupSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setPickup(item.display_name);
                    setPickupSuggestions([]);
                  }}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DESTINATION INPUT */}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              handleSuggestion(e.target.value, "destination");
            }}
          />

          {destinationSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {destinationSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setDestination(item.display_name);
                    setDestinationSuggestions([]);
                  }}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={calculateDistance} disabled={loading}>
          {loading ? "Calculating..." : "Get Fare"}
        </button>
      </div>

      {loading && (
        <div className="loading-gesture">
          <div className="spinner"></div>
          <p>Finding best route...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {distance && (
        <div className="fare-result">
          <p>
            <strong>Distance:</strong> {distance} km
          </p>
          <p>
            <strong>Estimated Fare:</strong> ₹{fare}
          </p>

          <button
            className="book-now"
            onClick={() =>
              navigate("/booking", {
                state: {
                  vehicle: selectedVehicle,
                  pickup,
                  destination,
                  distance,
                  fare,
                },
              })
            }
          >
            Book Now
          </button>
        </div>
      )}
    </section>
  );
}
