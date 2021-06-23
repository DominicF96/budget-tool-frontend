import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

import "./avatar.scss";

const Avatar = ({avatar_url, firstname, lastname, onClick}) => {
  if (onClick) {
    return (
      <button className="avatar">
        {avatar_url ? (
          <img alt="User Avatar" src={avatar_url} className="avatar_thumbnail mr-2" />
        ) : (
          <div className="avatar_thumbnail avatar_thumbnail_placeholder mr-2">
            <div className="avatar_thumbnail_placeholder_icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        )}
        <span className="avatar_name">
          {firstname}&nbsp;{lastname}
        </span>
      </button>
    );
  } else {
    return (
      <div className="avatar">
        {avatar_url ? (
          <img alt="User Avatar" src={avatar_url} className="avatar_thumbnail mr-2" />
        ) : (
          <div className="avatar_thumbnail avatar_thumbnail_placeholder mr-2">
            <div className="avatar_thumbnail_placeholder_icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        )}
        <span className="avatar_name">
          {firstname}&nbsp;{lastname}
        </span>
      </div>
    );
  }
};

export default Avatar;
