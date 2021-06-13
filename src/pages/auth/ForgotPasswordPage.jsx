import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { post } from "../../utils/http/fetching_utils";

const ForgotPasswordPage = ({ intl }) => {
  const reEmail = new RegExp(
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  const history = useHistory();
  const [email, setEmail] = useState("");
  const sendResetEmail = (e) => {
    e.preventDefault();
    if (reEmail.test(email)) {
      post("/auth/send_password_reset_link", { email })
        .then((res) => {
          toast.success("Check your emails");
        })
        .catch((err) => {
          toast.error(
            intl.formatMessage({ id: "error.mailing.failed_to_send" })
          );
        });
    } else {
      toast.error(intl.formatMessage({ id: "error.mailing.provide_valid_email" }));
    }
  };

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
                  isInvalid={email && !reEmail.test(email)}
                  className="mt-4"
                  placeholder={intl.formatMessage({
                    id: "generic.fields.email",
                  })}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Button
                  variant="primary"
                  type="submit"
                  id="send_btn"
                  className="mt-4 mb-3"
                  onClick={(e) => {
                    sendResetEmail(e);
                  }}
                  disabled={!email || !reEmail.test(email)}
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
        , <FormattedMessage id="generic.copyrights.all_rights_reserved" />
      </footer>
    </div>
  );
};

ForgotPasswordPage.propTypes = {};

export default injectIntl(ForgotPasswordPage);
