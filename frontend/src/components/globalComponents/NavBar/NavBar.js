// NavBar.js
import './NavBar.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


export default function NavBar() {
  const sessionUser = useSelector(state => state.session.user[0]);


  return (
    <div className="navbar" id="mainNavbar">
      <div className="navbar__logo" id="navbarLogo">
        <img src="/icons8-artstation-48.png" alt="navbar_logo" />
        <h1>Blog</h1>
      </div>
      <div className="navbar_links" id="navbarLinks">
        <ul>
          <li><NavLink to="/" activeclassname="activeNavLink">Home</NavLink></li>
          <li><NavLink to="/blogs" activeclassname="activeNavLink">Blogs</NavLink></li>
          <li><NavLink to="#" activeclassname="activeNavLink">About</NavLink></li>
          <li><NavLink to="#" activeclassname="activeNavLink">Contact</NavLink></li>
        </ul>
      </div>
      <div className="navbar_user" id="navbarUser">
        {sessionUser ? (
          <>
            <li><NavLink to="/profile" activeclassname="activeNavLink">Profile</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" activeclassname="activeNavLink">Login</NavLink></li>
            <li><NavLink to="/signup" activeclassname="activeNavLink">Sign Up</NavLink></li>
          </>
        )}
      </div>
    </div>
  );
}
