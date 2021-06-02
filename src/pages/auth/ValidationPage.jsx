import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { get } from "../../utils/http/fetching_utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const ValidationPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [IsValidating, setIsValidating] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    let id = location.pathname.split("/")[3];
    get(`/auth/validate/${id}`)
      .then((res) => {
        setIsValidating(false);
      })
      .catch((err) => {
        console.log(err);
        setIsValidating(false);
        setError(err);
      });
  }, [location.pathname]);

  return (
    <div className="fade-in" id="validation_page">
      <img
        src="/vectors/undraw_connection.svg"
        alt="Active Development"
        id="spice_up_img"
      />
      {IsValidating ? (
        <FontAwesomeIcon icon={faCircleNotch} size="4x" spin />
      ) : error ? (
        <>
          {error.verbose &&
          error.verbose.toLowerCase().indexOf("expired") !== -1 ? (
            <div className="fade-in">
              <h1>
                <FormattedMessage id="error.oops" />
              </h1>
              <p>
                <FormattedMessage id="error.error.registration.validation_link_expired" />
              </p>
              <a
                id="need_help"
                className="btn btn-link"
                href="https://m.me/oreusfinance"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="auth.login.need_help" />
              </a>
            </div>
          ) : (
            <div className="fade-in">
              <h1>
                <FormattedMessage id="error.oops" />
              </h1>
              <p>
                <FormattedMessage id="error.registration.failed_to_validate" />
              </p>
              <p>
                <FormattedMessage id="error.registration.failed_to_validate_follow_up" />
              </p>
              <a
                id="need_help"
                className="btn btn-link"
                href="https://m.me/oreusfinance"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FormattedMessage id="auth.login.need_help" />
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="fade-in">
          <h1>
            <FormattedMessage id="auth.validate.thanks" />
          </h1>
          <h2>
            <FormattedMessage id="auth.validate.proceed" />
          </h2>
          <Button
            className="back_to_login_btn"
            variant="primary"
            onClick={() => {
              history.push("/auth/login");
            }}
          >
            <FormattedMessage id="auth.validate.go_to_login" />
          </Button>
        </div>
      )}
    </div>
  );
};
export default ValidationPage;
