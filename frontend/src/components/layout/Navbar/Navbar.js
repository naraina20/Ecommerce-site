import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../images/urbannest.jpg";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [navbar, setNavbar] = useState(true);

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div className={navbar ? "navContainer" : "navContainer scrollyNav"}>
      <div className="navBlock1 logo">
        <MenuIcon className="menuIcon" onClick={() => setShow(!show)} />
        <Link to={"/"}>
          <img src={logo} alt="logo" />
          
        </Link>{" "}
      </div>
      <div className="navBlock2" style={{ left: show ? "0" : "-100%" }}>
        <nav>
          <NavLink exact to="/" onClick={() => setShow(!show)} className="navLink" activeClassName="active">
            {" "}
            <li>Home</li>{" "}
          </NavLink>
          <NavLink to="/products" onClick={() => setShow(!show)} className="navLink" activeClassName="active">
            {" "}
            <li>Products</li>{" "}
          </NavLink>
          <NavLink to="/about" onClick={() => setShow(!show)} className="navLink" activeClassName="active">
            {" "}
            <li>About</li>{" "}
          </NavLink>
          <NavLink to="/contact" onClick={() => setShow(!show)} className="navLink" activeClassName="active">
            {" "}
            <li>Contanct</li>{" "}
          </NavLink>
          <NavLink to="/account" onClick={() => setShow(!show)} className="navLink" activeClassName="active">
            {" "}
            <li>Profile</li>{" "}
          </NavLink>
          <NavLink to="/search" onClick={() => setShow(!show)} className="navLink" activeClassName="active">
            {" "}
            <li>Search</li>{" "}
          </NavLink>
        </nav>
      </div>
      <div className="navBlock3"></div>
    </div>
  );
};

export default Navbar;
