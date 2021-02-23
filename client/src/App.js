import React from "react";
import "./App.css";
//import Login from "./components/Login";
import Fehlertabelle from "./components/Fehlertabelle";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import { fehlers } from "./components/fehlers";

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
          <Route exact path="/">
            <p>HAUPTSEITE</p>
          </Route>
          <Route exact path="/fehler">
            <Fehlertabelle fehlers />
          </Route>
          <Route exact path="/fehler/erstellen">
            <p>FEHLER ERSTELLEN ANSICHT</p>
          </Route>
          <Route exact path="/analyse">
            <p>ANALYSE TERMINAL</p>
          </Route>
          <Route
            exact
            path="/fehler/ansicht/:id"
            children={<p>EINZELNE FEHLERANSICHT</p>}
          />
        </>
        <Route exact path="*">
          <p>ERROR</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
