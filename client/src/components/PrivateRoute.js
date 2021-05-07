import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from "axios";
import { URL_GET_USER, URL_GET_USER_BERECHTIGUNGEN } from "../constants";

const PrivateRoute = ({ berechtigungen, component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ anwenderid: 0 });
  const [userBerechtigungen, setUserBerechtigungen] = useState([]); // berechtigungen die der aktuelle Nutzer besitzt
  const [isBerechtigt, setIsBerechtigt] = useState(false);

  useEffect(async () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: URL_GET_USER,
    }).then((res) => {
      setIsLoggedIn(res.data.loggedIn);
      setUser(res.data.user);
      setUserBerechtigungen(res.data.berechtigungen);

      var berechtigungenUser = [];
      for (let i = 0; i < res.data.berechtigungen.length; i++) {
        berechtigungenUser.push(res.data.berechtigungen[i].beschreibung);
        
      }

      setIsBerechtigt(checkBerechtigung(berechtigungenUser, berechtigungen));
      console.log ("Berechtigung des Nutzer geladen:", res.data.berechtigung);
    });
  }, []);

  
  // prüfen ob der User die Berechtigung besitzt, die er für diese Route brauch
  const checkBerechtigung = (userBerechtigungen, routeBerechtigungen) => {
    // besitzt der Nutzer alle Berechtigungen die für die Route nötig sind, dann soll true return werden, sonst false
    let isBerechtigt = true;

    routeBerechtigungen.forEach((berechtigung) => {
      if (!userBerechtigungen.includes(berechtigung)) {
        isBerechtigt = false;
      }
    });

    return isBerechtigt;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          isBerechtigt ? (
            <Component {...props} />
          ) : (
            <h1>Sie sind für diese Aktion nicht berechtigt!</h1>
          )
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
