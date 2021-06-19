import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormattedMessage} from "react-intl";
import {useLocation} from "react-router";

import routes from "../../routes";

import "./breadcrumbs.scss";

const Breadcrumbs = () => {
  const location = useLocation();

  const renderTopLevel = () => {
    const topLevelUrl = location.pathname.split("/app")[1];
    const topLevelRoute = routes.filter(route => route.url === topLevelUrl)[0];
    return (
      <span id="top_level_breadcrumb" className="mr-3">
        <FontAwesomeIcon icon={topLevelRoute.icon} className="mr-3" />
        <FormattedMessage id={topLevelRoute.title} />
      </span>
    );
  };

  return <div className="breadcrumbs">{renderTopLevel()}</div>;
};

export default Breadcrumbs;