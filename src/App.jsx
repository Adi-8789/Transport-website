import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./Pages/Home";
import Booking from "./Pages/Booking";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Home /></>} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}
