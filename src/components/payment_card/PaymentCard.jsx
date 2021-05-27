import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import "./payment_card.scss";
import { FormattedMessage } from "react-intl";

const PaymentCard = ({
  oldPrice,
  price,
  isSimple,
  isSelected,
  onChange = () => {},
  rebateExplanation,
  rebateValue,
  term,
}) => {
  return (
    <Card
      className={`payment_card ${isSelected ? "payment_card_selected" : ""}`}
      onClick={() =>
        onChange({
          term,
          price,
        })
      }
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
        <div className="rebate_section">
          <span className="old_price">{oldPrice}C$</span>
          <span>{rebateExplanation}</span>
        </div>
        <div className="mt-4">
          <span className="price">{price}C$</span>&nbsp;/&nbsp;
          <span>{term}</span>
        </div>
      </div>
      <div className="rebate_container">
        <div>
          <span>{Math.floor((price / oldPrice) * 100)}%</span>
          <small className="rebate_text">
            <FormattedMessage id="rebate" />
          </small>
        </div>
      </div>
    </Card>
  );
};

PaymentCard.propTypes = {};

export default PaymentCard;
