import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleScroll("home")}>
        Aditya Transport
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <li><button onClick={() => handleScroll("home")}>Home</button></li>
        <li><button onClick={() => handleScroll("vehicles")}>Vehicles</button></li>
        <li><button onClick={() => handleScroll("book")}>Book</button></li>
        <li><button onClick={() => handleScroll("contact")}>Contact</button></li>
      </ul>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}
