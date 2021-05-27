import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Button } from "react-bootstrap";

const ValidationPage = () => {
  return (
    <div id="validation_page">
      <img
        src="/vectors/undraw_connection.svg"
        alt="Active Development"
        id="spice_up_img"
      />
      <h1>
        <FormattedMessage id="auth.validate.thanks" />
      </h1>
      <h2>
        <FormattedMessage id="auth.validate.proceed" />
      </h2>
      <Button variant="primary">
        <FormattedMessage id="auth.validate.go_to_login" />
      </Button>
    </div>
  );
};

ValidationPage.propTypes = {};

export default ValidationPage;
