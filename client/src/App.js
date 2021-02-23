import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registrierung">
          <p>REGISTRIERUNG</p>
        </Route>
        <>
          <Toolbar />
          <PrivateRoute exact path="/" component={dummy} />
          <PrivateRoute exact path="/fehler" component={dummy} />
          <PrivateRoute exact path="/fehler/erstellen" component={dummy} />
          <PrivateRoute exact path="/analyse" component={dummy} />
          <PrivateRoute exact path="/fehler/ansicht/:id" component={dummy} />
        </>
        <Route exact path="*">
          <p>ERROR</p>
        </Route>
      </Switch>
    </Router>
  );
}

const dummy = () => {
  return <p>DUMMY</p>;
};

export default App;
