import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";

import Cookies from "universal-cookie";
import {loadUser} from "../../redux/actions/user";
import {axiosInstance} from "../../utils/http/fetching_utils";

/* eslint-disable react/jsx-props-no-spreading */

/**
 * Renders a specific route only if a user is logged in.
 *
 * @param {Object} props Props of the component
 * @param {Object} props.component Component to be rendered if user is logged in
 */
const RouteAuth = ({component: Component, ...rest}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = new Cookies("token");
  const hasJWT = cookie.get("jwt") !== undefined;

  const userId = useSelector(state => state.user.id);
  const isLoadingUser = useSelector(state => state.user.isLoadingUser);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    console.log(hasJWT);
    if (hasJWT && !userId) {
      axiosInstance.interceptors.request.use(config => {
        return {
          ...config,
          headers: {Authorization: `Bearer ${cookie.get("jwt")}`},
        };
      });
      dispatch(loadUser());
    }
    if (!hasJWT) {
      history.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (userId !== undefined) {
      setHasFetched(true);
    }
  }, [userId]);

  if (hasJWT) {
    if (!hasFetched || isLoadingUser) {
      return <div>Loading info...</div>;
    } else {
      if (userId) {
        return <Component {...rest} />;
      } else {
        console.log("YOU HAVE NO USER ID MY DUDE.");
        return <Redirect to="/auth" />;
      }
    }
  } else {
    console.log("YOU HAVE NO JWT MY DUDE.");
    return <Redirect to="/auth" />;
  }
};

export default RouteAuth;
