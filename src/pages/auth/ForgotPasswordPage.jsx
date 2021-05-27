import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

const ForgotPasswordPage = ({ intl }) => {
  const history = useHistory();

  return (
    <div className="container-fluid fade-in" id="forgot_password_page">
      <Button
        variant="link"
        id="back_to_login_btn"
        onClick={() => history.push("/auth/login")}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
        <FormattedMessage id="auth.login.login" />
      </Button>
      <Row>
        <Col xs="12" md={{ span: 4, offset: 4 }}>
          <Row>
            <Col xs="12" className="order-3 order-md-1 text-center">
              <img
                src="/vectors/undraw_forgot_password.svg"
                alt="Forgot Password Banner"
                id="forgot_password_banner"
              />
            </Col>
            <Col xs="12" className="order-1 order-md-2">
              <h1 className="mt-0 mt-md-4" id="forgot_password_title">
                <FormattedMessage id="auth.forgot_password.forgot_password" />
              </h1>
            </Col>
            <Col xs="12" className="order-2 order-md-3">
              <p>
                <FormattedMessage id="auth.forgot_password.explanation" />
              </p>
            </Col>
            <Col xs="12" className="order-4 order-md-4">
              <Form>
                <Form.Control
                  type="email"
                  className="mt-4"
                  placeholder={intl.formatMessage({
                    id: "auth.forgot_password.email",
                  })}
                />
                <Button
                  variant="primary"
                  type="submit"
                  id="send_btn"
                  className="mt-4 mb-3"
                >
                  <FormattedMessage id="auth.forgot_password.send" />
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <footer className="d-none d-md-block">
        &copy; Oreus 2021
        {new Date().getFullYear() > 2021 ? (
          <>&nbsp;-&nbsp;{new Date().getFullYear()}</>
        ) : null}
        , <FormattedMessage id="legal.all_rights_reserved" />
      </footer>
    </div>
  );
};

ForgotPasswordPage.propTypes = {};

export default injectIntl(ForgotPasswordPage);
