import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/search/groups" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <div className="menu mt-2 mr-10 mb-2 md:mb-1">
      <ul className="navbar-nav flex-row gap-6">
        {navLinks.map((link, index) => (
          <li className={`nav-item  ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}
        <li className="nav-item px-2">
          <Link className="nav-link text-xl" to={"/friends"}>
            <FontAwesomeIcon icon={faUserFriends} />
          </Link>
        </li>
        <li className="nav-item dropdown">
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span
              className="material-icons"
              style={{
                color: notify.data.length > 0 ? "crimson" : "",
              }}
            >
              favorite
            </span>
            <span className="notify_length">{notify.data.length}</span>
          </span>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: "translateX(47px)" }}
          >
            <NotifyModal />
          </div>
        </li>
        <li className="nav-item dropdown ml-1" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle profile-btn"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user && auth.user.avatar} size="medium-avatar" />
          </span>
          <div className="dropdown-menu " aria-labelledby="navbarDropdown">
            <Link
              className="dropdown-item"
              to={`/profile/${auth.user && auth.user._id}`}
            >
              Profile
            </Link>
            {auth.user && auth.user.isAdmin && (
              <Link className="dropdown-item" to="/admindashboard">
                Admin panel
              </Link>
            )}
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
