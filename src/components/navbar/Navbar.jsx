import React from "react";
import {useSelector} from "react-redux";

import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Avatar from "../avatar/Avatar";

import "./navbar.scss";

const Navbar = () => {
  const user = useSelector(state => state.user);

  return (
    <nav id="navbar">
      <div className="navbar_topline">
        <Breadcrumbs />
        <img id="oreus_navbar_logo" alt="Oreus Finance Logo" src="/logo_full.svg" />
        <Avatar
          firstname={user.firstname}
          lastname={user.lastname}
          avatar_url={user.avatar_url}
          onClick={() => {
            console.log("lol");
          }}
        />
      </div>
      <Breadcrumbs className="pt-3" />
    </nav>
  );
};

export default Navbar;
