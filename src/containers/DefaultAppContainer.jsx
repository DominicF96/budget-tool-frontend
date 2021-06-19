import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

import routes from "../routes";

import "./default-app-container.scss";

const DefaultAppContainer = ({children}) => {
  return (
    <div id="default_app_container" className="fade-in">
      <nav id="navbar">
        <Breadcrumbs />
      </nav>
      <aside id="sidebar">
        <img id="oreus_sidebar_logo" alt="Oreus Finance Logo" src="/logo_full.svg" />
        {routes.map(route => {
          return (
            <Link className="sidebar_link" to={route.url}>
              <FontAwesomeIcon icon={route.icon} className="mr-3" />
              <FormattedMessage id={route.title} />
            </Link>
          );
        })}
      </aside>
      <main id="app_content">{children}</main>
    </div>
  );
};

export default DefaultAppContainer;
