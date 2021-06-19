import React from "react";

import "./avatar.scss";

const Avatar = ({avatar_url, firstname, lastname}) => {
  return (
    <div className="avatar">
      <img alt="User Avatar" src={avatar_url} className="avatar_thumbnail" />
      {firstname}&nbsp;{lastname}
    </div>
  );
};

export default Avatar;
