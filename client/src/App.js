import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/user/login",
    }).then((res) => console.log(res));
  };

  const requestTest = () => {
    Axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="email"
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={login}>Submit</button>
      <button onClick={requestTest}>getUser</button>
    </div>
  );
}

export default App;
