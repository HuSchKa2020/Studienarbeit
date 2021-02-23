import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";
import { URL_POST_LOGIN } from "../constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user/",
    }).then((res) => {
      setIsLoggedIn(res.data.loggedIn);
    });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
