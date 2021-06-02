import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { get } from "../../utils/http/fetching_utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ValidationEmailSentPage = ({ intl }) => {
  const history = useHistory();
  const location = useLocation();
  const [isSending, setIsSending] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    return clearTimeout;
  }, []);

  const handleResend = () => {
    let id = location.pathname.split("/")[3];
    setIsSending(true);
    get(`/auth/resend_validation/${id}`)
      .then((res) => {
        toast.success(
          intl.formatMessage({ id: "auth.check_inbox.validation_email_resent" })
        );
      })
      .catch((err) => {
        toast.error(
          intl.formatMessage({ id: "error.check_inbox.unable_to_send_email" })
        );
      })
      .finally(() => {
        setIsSending(false);
        setIsBtnDisabled(true);
        setTimeout(() => {
          setIsBtnDisabled(false);
        }, 15000);
      });
  };

  return (
    <div className="fade-in" id="validation_email_sent_page">
      <img
        src="/vectors/undraw_mailbox.svg"
        alt="Check Inbox"
        id="spice_up_img"
      />
      <div className="fade-in">
        <h1>
          <FormattedMessage id="auth.check_inbox.title" />
        </h1>
        <h2>
          <FormattedMessage id="auth.check_inbox.confirm_email" />
        </h2>
        <Button
          className="back_to_login_btn"
          variant="primary"
          onClick={handleResend}
          disabled={isBtnDisabled}
        >
          {isSending ? (
            <FontAwesomeIcon icon={faCircleNotch} spin={true} />
          ) : (
            <FormattedMessage id="auth.check_inbox.resend" />
          )}
        </Button>
      </div>
    </div>
  );
};
export default injectIntl(ValidationEmailSentPage);
