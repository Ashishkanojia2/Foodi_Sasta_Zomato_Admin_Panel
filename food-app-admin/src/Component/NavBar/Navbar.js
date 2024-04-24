import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h1>Foodie</h1>
      </div>
      <div className="nav-right">
        <Link to="/order">
          <p>Order</p>
        </Link>
        <Link to="/addfood">
          <p>Add Food</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
