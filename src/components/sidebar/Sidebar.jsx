import React from "react";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormattedMessage} from "react-intl";
import {Link, useLocation} from "react-router-dom";

import userRoutes from "../../pages/user/_routes";
import adminRoutes from "../../pages/admin/_routes";
import superadminRoutes from "../../pages/superadmin/_routes";

import "./sidebar.scss";
import {useState} from "react";

const Sidebar = () => {
  const location = useLocation();
  const [routes, setRoutes] = useState(userRoutes);
  const [section, setSection] = useState("app");
  useEffect(() => {
    setSection(location.pathname.split("/")[1]);
    if (section.indexOf("admin") !== -1) {
      setRoutes(adminRoutes);
    } else if (section.indexOf("superadmin") !== -1) {
      setRoutes(superadminRoutes);
    } else {
      setRoutes(userRoutes);
    }
  }, [section, location]);

  return (
    <aside id="sidebar">
      <img id="oreus_sidebar_logo" alt="Oreus Finance Logo" src="/logo_full.svg" />
      {routes
        .filter(route => route.showInSideBar === true)
        .map(route => {
          return (
            <Link
              key={route.url}
              className={`sidebar_link ${
                `/${section}${route.url}`.indexOf(location.pathname) !== -1
                  ? "active"
                  : ""
              }`}
              to={`/${section}${route.url}`}
            >
              <FontAwesomeIcon icon={route.icon} className="mr-3" />
              <span className="sidebar_link_title">
                <FormattedMessage id={route.title} />
              </span>
            </Link>
          );
        })}
    </aside>
  );
};

export default Sidebar;
