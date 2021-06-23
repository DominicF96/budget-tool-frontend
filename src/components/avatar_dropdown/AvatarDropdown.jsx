import {faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Dropdown} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

import Avatar from "../avatar/Avatar";

import "./avatar_dropdown.scss";

const AvatarDropdown = ({user}) => {
  return (
    <Dropdown className="avatar_dropdown">
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <Avatar
          firstname={user.firstname}
          lastname={user.lastname}
          avatar_url={user.avatar_url}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <FormattedMessage id="user" />
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          <FormattedMessage id="logout" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvatarDropdown;
