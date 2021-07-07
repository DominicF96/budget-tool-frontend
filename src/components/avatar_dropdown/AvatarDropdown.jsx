import React from "react";
import {Dropdown} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {useHistory} from "react-router-dom";
import {
  faCommentDots,
  faSignOutAlt,
  faUser,
  faUserSecret,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";

import Avatar from "../avatar/Avatar";
import {clearJWT} from "../../utils/http/fetching_utils";

import "./avatar_dropdown.scss";
import {logout} from "../../redux/actions/auth";

const AvatarDropdown = ({user}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const redirectTo = innerPath => {
    history.push(innerPath);
  };

  const handleContactUs = () => {
    window.location.href = "https://m.me/oreusfinance";
  };

  const handleLogout = () => {
    clearJWT();
    dispatch(logout());
    history.push("/auth/login");
  };

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
        <Dropdown.Item onClick={() => redirectTo("/app/profile")}>
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <FormattedMessage id="navbar.user_menu.preferences" />
        </Dropdown.Item>
        {user.role.name.indexOf("admin") !== -1 ? (
          <>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => redirectTo("/admin")}>
              <FontAwesomeIcon icon={faUserTie} className="mr-2" />
              <FormattedMessage id="navbar.user_menu.admin" />
            </Dropdown.Item>
            {user.role.name.indexOf("superadmin") !== -1 ? (
              <Dropdown.Item onClick={() => redirectTo("/superadmin")}>
                <FontAwesomeIcon icon={faUserSecret} className="mr-2" />
                <FormattedMessage id="navbar.user_menu.superadmin" />
              </Dropdown.Item>
            ) : null}
            <Dropdown.Divider />
          </>
        ) : null}
        <Dropdown.Item onClick={handleContactUs}>
          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
          <FormattedMessage id="navbar.user_menu.contact_us" />
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          <FormattedMessage id="navbar.user_menu.logout" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvatarDropdown;
