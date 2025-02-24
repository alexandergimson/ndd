// NavBar.js
import React from 'react';
import './NavBar.css'; // Assuming you will create a separate CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://cdn.prod.website-files.com/66d601cb0c6fc43926868bed/66f4a9dc6da01e9c081fb818_logo-hero.svg" alt="Logo" /> {/* Replace with your logo path */}
      </div>
      <div className="nav-info">
        Feedback? email agimson@neurolabs.ai
      </div>
    </nav>
  );
}

export default NavBar;
