import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormattedMessage} from "react-intl";
import {useLocation} from "react-router";

import userRoutes from "../../pages/user/_routes";
import adminRoutes from "../../pages/admin/_routes";
import superadminRoutes from "../../pages/superadmin/_routes";

import "./breadcrumbs.scss";

const Breadcrumbs = ({className}) => {
  const location = useLocation();

  const [routes, setRoutes] = useState(userRoutes);
  useEffect(() => {
    let section = location.pathname.split("/")[1];
    if (section.indexOf("admin") !== -1) {
      setRoutes(adminRoutes);
    } else if (section.indexOf("superadmin") !== -1) {
      setRoutes(superadminRoutes);
    } else {
      setRoutes(userRoutes);
    }
  }, [location]);

  const renderTopLevel = () => {
    let section = location.pathname.split("/")[1];
    const topLevelUrl = location.pathname.split(`/${section}`)[1];
    const topLevelRoute = routes.filter(route => route.url === topLevelUrl)[0];
    return (
      <span id="id" className="mr-3">
        <FontAwesomeIcon icon={topLevelRoute.icon} className="mr-3" />
        <FormattedMessage id={topLevelRoute.title} />
      </span>
    );
  };

  return <div className={`breadcrumbs ${className || ""}`}>{renderTopLevel()}</div>;
};

export default Breadcrumbs;
