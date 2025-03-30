import React from "react";
import "./Navbar.css"; // Ensure you create this file with common navbar styles

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <img src="/logo.png" alt="Logo" /> {/* Replace with your actual logo path */}
        <span>My App</span>
      </div>
      <div className="right">
        <button>Profile</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
