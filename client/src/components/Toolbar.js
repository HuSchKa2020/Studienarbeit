import React, { useState } from "react";
import styles from "./Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { URL_GET_LOGOUT } from "../constants";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Toolbar = () => {
  const history = useHistory();

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: URL_GET_LOGOUT,
    }).then((res) => {
      console.log(res.data);
      history.push("/login");
    });
  };

  return (
    <div className="toolbar">
      <FontAwesomeIcon
        icon={faUser}
        size="2x"
        className="toolbar-item"
        onClick={() => console.log("Hello World")}
      />

      <h2 className="toolbar-item" onClick={logout}>
        LOGOUT
      </h2>
    </div>
  );
};

export default Toolbar;
