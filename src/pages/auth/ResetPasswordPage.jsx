import React, {useState} from "react";
import {Col, Form, Row, Button} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {useHistory, useLocation} from "react-router";
import {toast} from "react-toastify";
import {post} from "../../utils/http/fetching_utils";
import {
  isPasswordValid,
  isPasswordConfirmValid,
  isPasswordInvalid,
  isPasswordConfirmInvalid,
} from "../../utils/validation/auth";

const ForgotPasswordPage = ({intl}) => {
  // TODO Merge in config file or something since its a
  // duplicate from registration and not using the same
  // validation library as the backend.
  const MIN_PASSWORD_LENGTH = 8;
  const reOneLowercase = new RegExp(/(?=.*[a-z])/);
  const reOneUppercase = new RegExp(/(?=.*[A-Z])/);
  const reOneDigit = new RegExp(/(?=.*\d)/);
  const reOneSpecialChar = new RegExp(/(?=.*\W)/);

  const history = useHistory();
  const location = useLocation();
  const [isPasswordInfoOpen, setIsPasswordInfoOpen] = useState(false);
  const [data, setData] = useState({});

  const updateData = (key, value) => {
    setData({...data, [key]: value});
  };

  const resetPassword = e => {
    e.preventDefault();
    let id = location.pathname.split("/")[3];
    if (
      isPasswordValid(data.password) &&
      isPasswordConfirmValid(data.password, data.confirm_password)
    ) {
      post(`/auth/reset_password/${id}`, {password: data.password})
        .then(res => {
          toast.success(intl.formatMessage({id: "password_reset.success"}));
          history.push("/auth/login");
        })
        .catch(err => {
          toast.error(intl.formatMessage({id: "error.password_reset.unable_to_reset"}));
        });
    } else {
      toast.error(intl.formatMessage({id: "error.password_reset.bad_form"}));
    }
  };

  return (
    <div className="container-fluid fade-in" id="password_reset_page">
      <Row>
        <Col xs="12" md={{span: 4, offset: 4}}>
          <Row>
            <Col xs="12" className="order-3 order-md-1 text-center">
              <img
                src="/vectors/undraw_authentication.svg"
                alt="Reset Password Banner"
                id="reset_password_banner"
              />
            </Col>
            <Col xs="12" className="order-1 order-md-2">
              <h1 className="mt-0 mt-md-4" id="reset_password_title">
                <FormattedMessage id="auth.reset_password.title" />
              </h1>
            </Col>
            <Col xs="12" className="order-4 order-md-4">
              <Form>
                <Form.Group>
                  <Form.Control
                    type="password"
                    isValid={isPasswordValid(data.password)}
                    isInvalid={isPasswordInvalid(data.password)}
                    placeholder={intl.formatMessage({
                      id: "generic.fields.password",
                    })}
                    className="mt-3"
                    onFocus={() => setIsPasswordInfoOpen(true)}
                    onBlur={() => setIsPasswordInfoOpen(false)}
                    onChange={e => updateData("password", e.target.value)}
                  />
                  <Form.Control
                    type="password"
                    isValid={isPasswordConfirmValid(data.password, data.confirm_password)}
                    isInvalid={isPasswordConfirmInvalid(
                      data.password,
                      data.confirm_password
                    )}
                    placeholder={intl.formatMessage({
                      id: "generic.fields.confirm_password",
                    })}
                    className="mt-3"
                    onChange={e => updateData("confirm_password", e.target.value)}
                  />
                  {isPasswordInfoOpen ? (
                    <div className="password_hints fade-in ml-2 my-2">
                      <small
                        className={
                          data.password && reOneLowercase.test(data.password)
                            ? "requirement_met"
                            : ""
                        }
                      >
                        <FontAwesomeIcon icon={faCircle} />
                        &nbsp;
                        <FormattedMessage id="generic.instructions.password.lowercase_letter" />
                      </small>
                      <small
                        className={
                          data.password && reOneUppercase.test(data.password)
                            ? "requirement_met"
                            : ""
                        }
                      >
                        <FontAwesomeIcon icon={faCircle} />
                        &nbsp;
                        <FormattedMessage id="generic.instructions.password.uppercase_letter" />
                      </small>
                      <small
                        className={
                          data.password && reOneDigit.test(data.password)
                            ? "requirement_met"
                            : ""
                        }
                      >
                        <FontAwesomeIcon icon={faCircle} />
                        &nbsp;
                        <FormattedMessage id="generic.instructions.password.number" />
                      </small>
                      <small
                        className={
                          data.password && reOneSpecialChar.test(data.password)
                            ? "requirement_met"
                            : ""
                        }
                      >
                        <FontAwesomeIcon icon={faCircle} />
                        &nbsp;
                        <FormattedMessage id="generic.instructions.password.special_character" />
                      </small>
                      <small
                        className={
                          data.password && data.password.length >= MIN_PASSWORD_LENGTH
                            ? "requirement_met"
                            : ""
                        }
                      >
                        <FontAwesomeIcon icon={faCircle} />
                        &nbsp;
                        <FormattedMessage id="generic.instructions.password.eight_characters" />
                      </small>
                    </div>
                  ) : null}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  id="send_btn"
                  className="mt-4 mb-3"
                  onClick={e => {
                    resetPassword(e);
                  }}
                  disabled={
                    !data.password ||
                    !data.confirm_password ||
                    isPasswordInvalid(data.password) ||
                    isPasswordConfirmInvalid(data.password, data.confirm_password)
                  }
                >
                  <FormattedMessage id="auth.reset_password.reset" />
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
