import React, { useState } from "react";
import { URL_POST_LOGIN } from "../constants";
import Axios from "axios";
import styles from "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Seite nicht automatisch neu laden
    Axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5000/user/login",
    }).then((res) => {
      console.log(res);
      const data = res.data;
      if (data.success === true) {
        // Login erfolgreich
        console.log(data.message);
      } else {
        // Login nicht erfolreich
        console.log(data.message);
      }
    });
  };

  return (
    <>
      <form className="centered">
        <h1>Login</h1>
        <div className="field">
          <label>E-Mail</label>
          <input
            className="inputField"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            className="inputField"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn neutral" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
