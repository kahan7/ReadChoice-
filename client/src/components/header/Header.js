import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar pt-2 navbar-Enter to Search expand-lg border-b-0 mt-0 pt-0 bg-white rounded-lg shadow-sm hover:shadow-lg ">
        <Link to="/" className="logo">
          <img
            src="https://res.cloudinary.com/dpzpv7tjr/image/upload/v1682266848/ReadChoice/logo_wvfeun.png"
            className="w-full object-contain md:w-40 "
          />
        </Link>

        <Search />

        <Menu />
      </nav>
    </div>
  );
};

export default Header;
