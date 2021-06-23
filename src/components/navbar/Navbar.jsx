import React from "react";
import {useSelector} from "react-redux";

import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import AvatarDropdown from "../avatar_dropdown/AvatarDropdown";

import "./navbar.scss";

const Navbar = () => {
  const user = useSelector(state => state.user);

  return (
    <nav id="navbar">
      <div className="navbar_topline">
        <Breadcrumbs />
        <img id="oreus_navbar_logo" alt="Oreus Finance Logo" src="/logo_full.svg" />
        <AvatarDropdown user={user} />
      </div>
      <Breadcrumbs className="pt-3" />
    </nav>
  );
};

export default Navbar;
