import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./oalert.scss";

const OAlert = ({ variant, children }) => {
  const getAlertIcon = () => {
    switch (variant) {
      case "primary":
        return <FontAwesomeIcon className="oalert_icon" icon={faInfoCircle} />;
      case "success":
        return <FontAwesomeIcon className="oalert_icon" icon={faCheckCircle} />;
      case "danger":
        return <FontAwesomeIcon className="oalert_icon" icon={faTimesCircle} />;
      case "warning":
        return (
          <FontAwesomeIcon className="oalert_icon" icon={faExclamationCircle} />
        );
      default:
        return <FontAwesomeIcon className="oalert_icon" icon={faInfoCircle} />;
    }
  };

  return (
    <Alert className="oalert" variant={variant}>
      {getAlertIcon()}
      {children}
    </Alert>
  );
};

OAlert.propTypes = {};

export default OAlert;
