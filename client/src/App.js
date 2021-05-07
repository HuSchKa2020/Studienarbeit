import React, { useState, useEffect } from "react";

// CSS
import "./App.css";

// Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Components
import Toolbar from "./components/Toolbar";
import Login from "./components/Login";
import Fehlertabelle from "./components/Fehlertabelle";
import Fehlersuche from "./components/Fehlersuche";
import Fehler from "./components/EinzelnerFehler";
import FehlerErstellen from "./components/FehlerErstellen";
import Home from "./components/Home";
import Einstellungen from "./components/Einstellungen";

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
          <PrivateRoute exact path="/" component={Home} berechtigungen={[]} />
          <PrivateRoute
            exact
            path="/fehler"
            component={Fehlersuche}
            berechtigungen={["read"]}
          />
          <PrivateRoute
            exact
            path="/fehler/erstellen"
            component={FehlerErstellen}
            berechtigungen={["write"]}
          />
          <PrivateRoute
            exact
            path="/analyse"
            component={dummy}
            berechtigungen={["analyse"]}
          />
          <PrivateRoute
            exact
            path="/fehler/ansicht/:id"
            component={Fehler}
            berechtigungen={["read"]}
          />
          <PrivateRoute 
            exact 
            path="/einstellungen" 
            component={Einstellungen}
            berechtigungen={[]}
           />
        </>
        <Route exact path="*">
          <p>ERROR</p>
        </Route>
      </Switch>
    </Router>
  );
}

const dummy = () => {
  return <h1>dummy</h1>;
};

export default App;
