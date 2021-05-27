import React from "react";
import { Button, Form } from "react-bootstrap";
import { injectIntl, FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentCard from "../../components/payment_card/PaymentCard";

const RegistrationPage = ({ intl }) => {
  const history = useHistory();

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
      <a
        id="need_help"
        className="btn btn-link"
        href="https://m.me/oreusfinance"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FormattedMessage id="auth.login.need_help" />
      </a>
      <Form.Control type="text" placeholder="Prenom" className="mt-3" />
      <Form.Control type="text" placeholder="Nom" className="mt-3" />
      <Form.Control type="email" placeholder="Courriel" className="mt-3" />
      <Form.Control as="select" placeholder="Sexe" className="mt-3">
        <option>Non spécifié</option>
        <option>Femme</option>
        <option>Homme</option>
        <option>Autre</option>
      </Form.Control>
      <hr className="mt-4 mb-4" />
      <Form.Control type="text" placeholder="Identifiant" className="mt-3" />
      <Form.Control
        type="password"
        placeholder="Mot de passe"
        className="mt-3"
      />
      <Form.Control
        type="password"
        placeholder="Confirmez le mot de passe"
        className="mt-3"
      />
      <Form.Group className="mt-3 premium_toggle_group">
        <Form.Check type="checkbox" label="Adhésion premium" />
      </Form.Group>
      <PaymentCard
        oldPrice={3.49}
        price={1.75}
        rebateExplanation="Rabais premiers utilisateurs"
        term="monthly"
      />
      <Form.Group className="mt-3 premium_toggle_group">
        <Form.Check
          type="checkbox"
          label="J'aimerais recevoir des trucs et astuces ainsi que des nouvelles d'Oreus Finance par courriel. "
        />
      </Form.Group>
      <Form.Group className="mt-3 premium_toggle_group">
        <Form.Check
          type="checkbox"
          label="J'ai lu et j'accepte les conditions d'utilisation et les politiques de confidentialités."
        />
      </Form.Group>
    </div>
  );
};

export default injectIntl(RegistrationPage);
