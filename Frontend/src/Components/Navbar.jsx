import { NavLink } from "react-router-dom";
import "./Styles/Navbar.css"

function Navbar() {
  return (
    <nav>
      <NavLink className="logo" to="/#">Logo</NavLink>
      <div className="nav-links">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
      <div className="nav-btn">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;