import {faGem} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import {Form, FormControl} from "react-bootstrap";
import {useSelector} from "react-redux";

import DefaultAppContainer from "../../containers/DefaultAppContainer";

const UserProfilePage = () => {
  const user = useSelector(state => state.user);

  return (
    <DefaultAppContainer>
      <img style={{maxWidth: "100%"}} src={user.avatar_url} alt="User Avatar" />
      <div>
        Membre depuis {moment(user.created_at).format("LL")}
        {/* TODO: IS PREMIUM ? */}
        {true ? (
          <div>
            <FontAwesomeIcon icon={faGem} className="mr-2" />
            Premium
          </div>
        ) : null}
      </div>
      <Form>
        <FormControl
          disabled
          className="mt-2"
          placeholder="firstname"
          value={user.firstname}
        />
        <FormControl
          disabled
          className="mt-2"
          placeholder="lastname"
          value={user.lastname}
        />
        <FormControl disabled className="mt-2" placeholder="email" value={user.email} />
      </Form>
    </DefaultAppContainer>
  );
};

export default UserProfilePage;
