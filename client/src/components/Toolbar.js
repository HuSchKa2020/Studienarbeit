import React, { useState } from "react";
import styles from "./Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="toolbar">
      <FontAwesomeIcon
        icon={faUser}
        size="2x"
        className="toolbar-item"
        onClick={() => console.log("Hello World")}
      />
    </div>
  );
};

export default Login;
