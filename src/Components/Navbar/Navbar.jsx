import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>CO-MERCY</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/" className="nav-link">
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link to="/men" className="nav-link">
            Men
          </Link>{" "}
          {menu === "men" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link to="/women" className="nav-link">
            Women
          </Link>{" "}
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/kids" className="nav-link">
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <div>{user.user_id}</div>
        ) : (
          <Link to="/login" className="nav-link">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" className="nav-link">
          {" "}
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
      {user ? <button onClick={logout}>Log Out</button> : <></>}
    </div>
  );
}

export default Navbar;
