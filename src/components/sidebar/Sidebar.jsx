import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormattedMessage} from "react-intl";
import {Link, useLocation} from "react-router-dom";

import routes from "../../routes";

import "./sidebar.scss";

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside id="sidebar">
      <img id="oreus_sidebar_logo" alt="Oreus Finance Logo" src="/logo_full.svg" />
      {routes.map(route => {
        return (
          <Link
            key={route.url}
            className={`sidebar_link ${
              `/app${route.url}`.indexOf(location.pathname) !== -1 ? "active" : ""
            }`}
            to={`/app${route.url}`}
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
