import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ user }) {
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <header className="header">
      <div className="header-home-button">
        <div>
          <Link to={"/"}>
            <FaHome
              className="home-icon"
              // onMouseOver={({ target }) => (target.style.color = "#ee8802")}
            />
          </Link>
        </div>
      </div>
      <div className="header-profile-button">
        {user ? (
          <div className="profile-icon">{user.charAt(0).toUpperCase()}</div>
        ) : (
          <button>
            <FaUserCircle className="profile-icon" size={30} />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
