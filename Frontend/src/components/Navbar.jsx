import { IconButton } from "@mui/material";
import { Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { setLogout } from "../redux/state";
import "../Style/Navbar.css";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdownMenu = () => setDropdownMenu((prev) => !prev);
  const profileIcon = <AccountCircle sx={{ fontSize: 40, color: "gray" }} />;

  return (
    <div className="navbar">
      <a href="/" class="navbar_logo">
        Car Rental Service
      </a>
      <div className="navbar_right">
        <Link to={user ? "/create-listing" : "/login"} className="host">
          Become A Host
        </Link>

        <button
          className="navbar_right_account"
          aria-label="Account Menu"
          onClick={toggleDropdownMenu}
        >
          <Menu sx={{ color: "var(--darkgrey)" }} />
          {!user ? (
            <Person sx={{ color: "var(--darkgrey)" }} />
          ) : (
            <div className="profile-icon">{profileIcon}</div>
          )}
        </button>

        {dropdownMenu && (
          <div className="navbar_right_accountmenu">
            {!user ? (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to={`/${user?.user?._id}/trips`}>Trip List</Link>
                {/* <Link to={`/${user._id}/wishList`}>Wish List</Link> */}
                <Link to={`/${user?.user?._id}/cars`}>Car List</Link>
                <Link to={`/${user?.user?._id}/reservations`}>
                  Reservation List
                </Link>
                <Link to="/create-listing">Become A Host</Link>
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                >
                  Log Out
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
