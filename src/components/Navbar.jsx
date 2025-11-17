import { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close menu on mobile
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => handleScroll("home")}>
        Aditya Transport
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><button onClick={() => handleScroll("home")}>Home</button></li>
        <li><button onClick={() => handleScroll("vehicles")}>Vehicles</button></li>
        <li><button onClick={() => handleScroll("book")}>Book</button></li>
        <li><button onClick={() => handleScroll("contact")}>Contact</button></li>
      </ul>

      {/* Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}
