// NavBar.js
import React from 'react';
import './NavBar.css'; // Assuming you will create a separate CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://autogenai.com/wp-content/uploads/2023/09/AutogenAI-logo-white-768x156.png" alt="Logo" /> {/* Replace with your logo path */}
      </div>
      <div className="nav-info">
        Feedback? email jaimie.anzelone@autogenai.com
      </div>
    </nav>
  );
}

export default NavBar;
