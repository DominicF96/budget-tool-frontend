import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import "./payment_card.scss";
import { FormattedMessage } from "react-intl";

const PaymentCard = ({
  id,
  oldPrice,
  price,
  isSelected,
  onChange = () => {},
  rebateExplanation,
  term,
}) => {
  return (
    <button
      className="payment_card_btn_wrapper"
      onClick={(e) => {
        e.preventDefault();
        onChange(id);
      }}
    >
      <Card
        className={`payment_card ${isSelected ? "payment_card_selected" : ""}`}
      >
        {isSelected ? (
          <img
            className="circle_select"
            alt="Payment Card Selected"
            src="/vectors/payment_card_circle_selected.svg"
          />
        ) : (
          <img
            className="circle_select"
            alt="Payment Card Selected"
            src="/vectors/payment_card_circle_empty.svg"
          />
        )}
        <div className="info_container">
          {oldPrice ? (
            <div className="rebate_section mb-4">
              <span className="old_price">{oldPrice}C$</span>
              <span>{rebateExplanation}</span>
            </div>
          ) : null}
          {price && price > 0 ? (
            <div className="price-container">
              <>
                <span className={`price ${!oldPrice ? "no_rebate" : ""}`}>
                  {price}C$
                </span>
                {oldPrice ? (
                  <>
                    &nbsp;/&nbsp;
                    <span>
                      <FormattedMessage
                        id={`auth.registration.payment_card.${term}`}
                      />
                      *
                    </span>
                  </>
                ) : (
                  <div>
                    <FormattedMessage
                      id={`auth.registration.payment_card.${term}`}
                    />
                    *
                  </div>
                )}
              </>
            </div>
          ) : (
            <div className="free-text-container">
              <FormattedMessage id="auth.registration.payment_card.no_thanks" />
              ,&nbsp;
              <FormattedMessage id="auth.registration.payment_card.use_for_free" />
            </div>
          )}
        </div>
        {oldPrice ? (
          <div className="rebate_container">
            <div>
              <span>{Math.ceil((1 - price / oldPrice) * 100)}%</span>
              <small className="rebate_text">
                <FormattedMessage id="auth.registration.payment_card.rebate" />
              </small>
            </div>
          </div>
        ) : null}
      </Card>
    </button>
  );
};

PaymentCard.propTypes = {
  id: PropTypes.string,
  oldPrice: PropTypes.number,
  price: PropTypes.number,
  isSelected: PropTypes.bool,
  onChange: PropTypes.func,
  rebateExplanation: PropTypes.string,
  term: PropTypes.string,
};

export default PaymentCard;
