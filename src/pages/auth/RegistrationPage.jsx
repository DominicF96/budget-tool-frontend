import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { injectIntl, FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import {
  faChevronLeft,
  faCircle,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faCcAmex,
  faCcMastercard,
  faCcVisa,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import PaymentCard from "../../components/payment_card/PaymentCard";
import { get, post } from "../../utils/http/fetching_utils";
import OAlert from "../../components/alert/OAlert";
import { getLang } from "../../utils/browserFunctions";
import {
  isPasswordConfirmInvalid,
  isPasswordConfirmValid,
  isPasswordInvalid,
  isPasswordValid,
  MIN_PASSWORD_LENGTH,
  reCCExp,
  reEmail,
  reOneDigit,
  reOneLowercase,
  reOneSpecialChar,
  reOneUppercase,
} from "../../utils/validation/auth";

const RegistrationPage = ({ intl }) => {
  const history = useHistory();

  const [isPasswordInfoOpen, setIsPasswordInfoOpen] = useState(false);
  const [retrievedPrices, setRetrievedPrices] = useState(); // TODO: Support multiple prices
  // Used to track form completion time to detect bots.
  const pageOpenedAt = moment();
  const [data, setData] = useState({
    selected_membership: "free",
    sex: "not_specified",
    subscribe_to_newsletter: false,
    accept_terms_and_conditions: false,
    // If a bot fills the form, it will be tempted to fill
    // certain fields that will change this value. confirming
    // the value on the backend will eliminate some automated
    // registrations.
    honeypot: "This form was possibly completed by a human.",
    language: getLang(),
  });

  useEffect(() => {
    get("/stripe/get_prices")
      .then((res) => {
        setRetrievedPrices({
          price: res.data.data[0].unit_amount / 100,
          term: res.data.data[0].recurring.interval,
        }); // TODO: Support multiple prices
      })
      .catch((err) => {
        console.error("An error occured while retrieving prices.", err);
      });
  }, []);

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  /**
   * Everybody loves mapple syrup. Especially bots.
   * Render this field to create a honeypot for bots
   * to fill (while humans won't).
   */
  const botsProtectionForm = () => {
    console.log(pageOpenedAt.format());
    return (
      <Form.Group className="oh_no_honeypot">
        <Form.Control
          id="phone"
          placeholder="Phone"
          autoComplete="off"
          name="phone"
          type="text"
          onChange={(e) => updateData("honeypot", e.target.value)}
        />
        <Form.Control
          id="address"
          placeholder="Address"
          autoComplete="off"
          name="address"
          type="text"
          onChange={(e) => updateData("honeypot", e.target.value)}
        />
        <Form.Control
          id="email"
          placeholder="Email"
          autoComplete="off"
          name="email"
          type="text"
          onChange={(e) => updateData("honeypot", e.target.value)}
        />
      </Form.Group>
    );
  };

  const handleCreateAccount = () => {
    if (
      !data.firstname ||
      !data.lastname ||
      !data.email ||
      !data.sex ||
      !data.username ||
      !data.password ||
      !data.selected_membership
    ) {
      toast.error(
        intl.formatMessage({ id: "error.registration.required_fields_missing" })
      );
    } else if (!reEmail.test(data.email)) {
      toast.error(
        intl.formatMessage({ id: "error.registration.invalid_email" })
      );
    } else if (
      isPasswordInvalid(data.password) ||
      isPasswordConfirmInvalid(data.password, data.confirm_password)
    ) {
      toast.error(
        intl.formatMessage({
          id: "error.registration.weak_or_password_mismatch",
        })
      );
    } else if (
      data.selected_membership.indexOf("free") === -1 &&
      (!data.cc_number || !data.cc_expiration || !data.cc_cvv)
    ) {
      toast.error(
        intl.formatMessage({
          id: "error.registration.missing_payment",
        })
      );
    } else if (
      data.selected_membership.indexOf("free") === -1 &&
      !reCCExp.test(data.cc_expiration)
    ) {
      toast.error(
        intl.formatMessage({
          id: "error.registration.invalid_cc_expiration",
        })
      );
    } else if (!data.accept_terms_and_conditions) {
      toast.error(
        intl.formatMessage({
          id: "error.registration.terms_and_conditions_not_accepted",
        })
      );
    } else {
      createAccount();
    }
  };

  const createAccount = () => {
    post("/auth/register", {
      ...data,
      form_completion_time: moment().diff(pageOpenedAt),
    })
      .then((res) => {
        console.log(res);
        history.push(`/auth/check_inbox/${res.data.temporary_link_id}`);
        toast.success(
          "Un courriel de confirmation a été envoyé, veuillez vérifier votre boîte de réception."
        );
      })
      .catch((err) => {
        if (
          err &&
          err.verbose &&
          err.verbose.toLowerCase().indexOf("email") !== -1
        ) {
          toast.error(
            intl.formatMessage({
              id: "error.registration.email_not_unique",
            })
          );
        } else if (
          err &&
          err.verbose &&
          err.verbose.toLowerCase().indexOf("username") !== -1
        ) {
          toast.error(
            intl.formatMessage({
              id: "error.registration.username_not_unique",
            })
          );
        } else {
          toast.error(
            intl.formatMessage({
              id: "error.registration.failed_to_create_account",
            })
          );
        }
      });
  };

  return (
    <div className="container-fluid fade-in" id="registration_page">
      <Button
        variant="link"
        id="back_to_login_btn"
        onClick={() => history.push("/auth/login")}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
        <FormattedMessage id="auth.login.login" />
      </Button>
      <h1>
        <FormattedMessage id="auth.registration.tell_us_about_you" />
      </h1>
      <img
        src="/vectors/undraw_personal_information.svg"
        alt="Personnal Information"
        id="spice_up_img"
      />
      <Button
        id="need_help"
        variant="link"
        className="pl-2"
        href="https://m.me/oreusfinance"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FormattedMessage id="auth.login.need_help" />
      </Button>
      <Form>
        {botsProtectionForm()}
        <Row>
          <Col xs="12" md="10" lg="8" xl="6">
            <Form.Group>
              <Form.Label className="mx-2 mb-0 mt-4">
                <FormattedMessage id="auth.registration.who_are_you" />
              </Form.Label>
              <Row>
                <Col xs="12" md="6">
                  <Form.Control
                    type="text"
                    placeholder={intl.formatMessage({
                      id: "generic.fields.firstname",
                    })}
                    className="mt-3"
                    onChange={(e) => updateData("firstname", e.target.value)}
                  />
                </Col>
                <Col xs="12" md="6">
                  <Form.Control
                    type="text"
                    placeholder={intl.formatMessage({
                      id: "generic.fields.lastname",
                    })}
                    className="mt-3"
                    onChange={(e) => updateData("lastname", e.target.value)}
                  />
                </Col>
                <Col xs="12" md="6">
                  <Form.Control
                    type="email"
                    isInvalid={data.email && !reEmail.test(data.email)}
                    placeholder={intl.formatMessage({
                      id: "generic.fields.email",
                    })}
                    className="mt-3"
                    onChange={(e) => updateData("email", e.target.value)}
                  />
                </Col>
                <Col xs="12" md="6">
                  <Form.Control
                    as="select"
                    placeholder={intl.formatMessage({
                      id: "generic.fields.sex",
                    })}
                    className="mt-3"
                    onChange={(e) => updateData("sex", e.target.value)}
                  >
                    <option value="not_specified">
                      {intl.formatMessage({
                        id: "generic.fields.sex.not_specified",
                      })}
                    </option>
                    <option value="female">
                      {intl.formatMessage({
                        id: "generic.fields.sex.female",
                      })}
                    </option>
                    <option value="male">
                      {intl.formatMessage({
                        id: "generic.fields.sex.male",
                      })}
                    </option>
                    <option value="other">
                      {intl.formatMessage({
                        id: "generic.fields.sex.other",
                      })}
                    </option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mx-2 mb-0 mt-4">
                <FormattedMessage id="auth.registration.account_access" />
              </Form.Label>
              <Row>
                <Col xs="12" md="6">
                  <Form.Control
                    type="text"
                    placeholder={intl.formatMessage({
                      id: "generic.fields.username",
                    })}
                    className="mt-3"
                    onChange={(e) => updateData("username", e.target.value)}
                  />
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
                    onChange={(e) => updateData("password", e.target.value)}
                  />
                  <Form.Control
                    type="password"
                    isValid={isPasswordConfirmValid(
                      data.password,
                      data.confirm_password
                    )}
                    isInvalid={isPasswordConfirmInvalid(
                      data.password,
                      data.confirm_password
                    )}
                    placeholder={intl.formatMessage({
                      id: "generic.fields.confirm_password",
                    })}
                    className="mt-3"
                    onChange={(e) =>
                      updateData("confirm_password", e.target.value)
                    }
                  />
                </Col>
                <Col xs="12" md="6">
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
                          data.password &&
                          data.password.length >= MIN_PASSWORD_LENGTH
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
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mx-2 mb-0 mt-4">
                <FormattedMessage id="auth.registration.enjoy_premium" />
                &nbsp;
                <a
                  href="https://www.oreus.ca#plan_anchor"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FontAwesomeIcon icon={faGem} /> Premium
                </a>
                &nbsp;?
                <div>
                  {moment().isBefore("2022-02-15T00:00:00") ? (
                    <small>
                      <FormattedMessage id="auth.registration.early_adopter_incentive" />
                      &nbsp;
                    </small>
                  ) : null}
                </div>
                <div></div>
              </Form.Label>
              <Row className="payment_card_container">
                <Col xs="12" md="6">
                  <PaymentCard
                    id="free"
                    price={0}
                    isSelected={
                      data.selected_membership
                        ? data.selected_membership.indexOf("free") !== -1
                        : false
                    }
                    onChange={(v) => updateData("selected_membership", v)}
                  />
                </Col>
                <Col xs="12" md="6">
                  {retrievedPrices && retrievedPrices.price ? (
                    <>
                      <PaymentCard
                        id="monthly_early"
                        oldPrice={3.49}
                        price={retrievedPrices.price}
                        rebateExplanation={intl.formatMessage({
                          id: "auth.registration.payment_card.early_adopter_discount",
                        })}
                        term="month"
                        isSelected={
                          data.selected_membership
                            ? data.selected_membership.indexOf(
                                "monthly_early"
                              ) !== -1
                            : false
                        }
                        onChange={(v) => updateData("selected_membership", v)}
                      />
                    </>
                  ) : (
                    <OAlert variant="danger">
                      <FormattedMessage id="error.stripe.unavailable" />
                    </OAlert>
                  )}
                </Col>
              </Row>
              <small>
                *
                <FormattedMessage id="auth.registration.prices_exclude_taxes" />
              </small>
              {/* {moment().isAfter("2022-02-15T00:00:00") ? (
            <>
              <PaymentCard
                id="monthly_regular_price"
                price={3.49}
                term="month"
                isSelected={
                  data.selected_membership
                    ? data.selected_membership.indexOf(
                        "monthly_regular_price"
                      ) !== -1
                    : false
                }
                onChange={(v) => updateData("selected_membership", v)}
              />
              <PaymentCard
                id="yearly_regular_price"
                price={34.99}
                oldPrice={41.88}
                rebateExplanation={intl.formatMessage({
                  id: "auth.registration.payment_card.yearly_subscribtion_discount",
                })}
                term="year"
                isSelected={
                  data.selected_membership
                    ? data.selected_membership.indexOf(
                        "yearly_regular_price"
                      ) !== -1
                    : false
                }
                onChange={(v) => updateData("selected_membership", v)}
              />
            </>
          ) : ( */}
              {/* )} */}
              {data.selected_membership &&
              data.selected_membership.indexOf("free") === -1 ? (
                <div className="fade-in mt-4">
                  <Form.Label>
                    <FormattedMessage id="auth.registration.payment.how_to_pay" />
                  </Form.Label>
                  <Row>
                    <Col xs="12" md="6">
                      <Form.Control
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9\s]{13,19}"
                        autoComplete="cc-number"
                        maxLength="19"
                        placeholder={intl.formatMessage({
                          id: "generic.fields.cc_number",
                        })}
                        className="mt-2"
                        onChange={(e) =>
                          updateData("cc_number", e.target.value)
                        }
                      />
                      <FontAwesomeIcon icon={faCcVisa} className="ml-3 mr-2" />
                      <FontAwesomeIcon icon={faCcMastercard} className="mr-2" />
                      <FontAwesomeIcon icon={faCcAmex} className="mr-2" />
                      <Row className="mt-1">
                        <Col xs="6">
                          <Form.Control
                            type="tel"
                            placeholder={intl.formatMessage({
                              id: "generic.fields.cc_expiration",
                            })}
                            autoComplete="cc-expiration"
                            maxLength="5"
                            isInvalid={
                              data.cc_expiration &&
                              !reCCExp.test(data.cc_expiration)
                            }
                            pattern="/^[0-9]{2}/[0-9]{2}$/"
                            inputMode="numeric"
                            onChange={(e) =>
                              updateData("cc_expiration", e.target.value)
                            }
                          />
                        </Col>
                        <Col xs="6">
                          <Form.Control
                            type="tel"
                            placeholder={intl.formatMessage({
                              id: "generic.fields.cc_cvv",
                            })}
                            autoComplete="cc-cvv"
                            maxLength="4"
                            pattern="/^[0-9]{3,4}$/"
                            inputMode="numeric"
                            onChange={(e) =>
                              updateData("cc_cvv", e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form.Label className="secured_by">
                    <a
                      href="https://www.stripe.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <FormattedMessage id="auth.registration.payment.secured_by" />
                      <FontAwesomeIcon
                        icon={faStripe}
                        size="2x"
                        className="ml-1"
                      />
                      .
                    </a>
                  </Form.Label>
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mt-4 premium_toggle_group">
              <Form.Check
                type="checkbox"
                label={intl.formatMessage({
                  id: "auth.registration.sign_up_to_newsletter",
                })}
                onChange={(e) =>
                  updateData("subscribe_to_newsletter", e.target.checked)
                }
              />
            </Form.Group>
            <Form.Group className="mt-3 premium_toggle_group">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <FormattedMessage id="auth.registration.i_accept" />
                    &nbsp;
                    <a
                      href="https://www.example.com" // TODO: REPLACE
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <FormattedMessage id="auth.registration.terms_of_use" />
                    </a>
                    &nbsp;
                    <FormattedMessage id="auth.registration.and_the" />
                    &nbsp;
                    <a
                      href="https://www.example.com" // TODO: REPLACE
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <FormattedMessage id="auth.registration.privacy_policies" />
                    </a>
                    .
                  </>
                }
                onChange={(e) =>
                  updateData("accept_terms_and_conditions", e.target.checked)
                }
              />
            </Form.Group>
            <Button
              variant="secondary"
              size="lg"
              className="mb-3 btn-block"
              onClick={handleCreateAccount}
            >
              <FormattedMessage id={"auth.registration.create_account"} />
            </Button>
          </Col>
        </Row>
      </Form>
      <footer className="d-none d-lg-block">
        <div>
          &copy; Oreus 2021
          {new Date().getFullYear() > 2021 ? (
            <>&nbsp;-&nbsp;{new Date().getFullYear()}</>
          ) : null}
          , <FormattedMessage id="generic.copyrights.all_rights_reserved" />
        </div>
      </footer>
    </div>
  );
};

export default injectIntl(RegistrationPage);
