import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { injectIntl, FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const LoginPage = ({ intl }) => {
  const history = useHistory();

  return (
    <div className="container-fluid fade-in" id="login_page">
      <a
        id="need_help"
        className="btn btn-link"
        href="https://m.me/oreusfinance"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FormattedMessage id="auth.login.need_help" />
      </a>
      <div id="login_page_forms_container">
        <img src="/logo.svg" alt="Oreus Finance Logo" id="oreus_logo" />
        <img
          src="/vectors/undraw_lotus_top_left.svg"
          alt="Oreus Finance Logo"
          id="lotus_top_left"
        />
        <img
          src="/vectors/undraw_mixed_dev_focus.svg"
          alt="Active Development"
          className="d-none d-md-block"
          id="spice_up_img"
        />
        <Row>
          <Col xs="12" md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <Form>
              <Form.Control
                type="text"
                className="mb-3 mt-2"
                placeholder={intl.formatMessage({ id: "generic.fields.username" })}
              />
              <Form.Control
                type="password"
                className="my-3"
                placeholder={intl.formatMessage({ id: "generic.fields.password" })}
              />
              <Button
                variant="primary"
                type="submit"
                id="login_btn"
                className="mt-4 mb-3"
              >
                <FormattedMessage id="auth.login.login" />
              </Button>
              <Button
                variant="link"
                onClick={() => history.push("/auth/forgot_password")}
              >
                <FormattedMessage id="auth.login.forgot_password" />
              </Button>
            </Form>
            <Link
              className="btn btn-outline-secondary btn-block"
              id="create_account_btn"
              to="/auth/register"
            >
              <FormattedMessage id="auth.login.create_account" />
            </Link>
          </Col>
        </Row>
      </div>
      <footer className="d-none d-lg-block">
        &copy; Oreus 2021
        {new Date().getFullYear() > 2021 ? (
          <>&nbsp;-&nbsp;{new Date().getFullYear()}</>
        ) : null}
        , <FormattedMessage id="generic.copyrights.all_rights_reserved" />
      </footer>
    </div>
  );
};

export default injectIntl(LoginPage);
