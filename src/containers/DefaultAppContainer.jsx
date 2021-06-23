import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Button} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import "./default-app-container.scss";

const DefaultAppContainer = ({children}) => {
  return (
    <div id="default_app_container">
      <Navbar />
      <Sidebar />
      <main id="app_content" className="fade-in">
        {children}
      </main>
      <Button size="lg" id="add_transaction_button" variant="secondary">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        <FormattedMessage id="generic.new_transaction" />
      </Button>
    </div>
  );
};

export default DefaultAppContainer;
