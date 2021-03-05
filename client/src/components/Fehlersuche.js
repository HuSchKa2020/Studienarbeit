import React, { useState, useEffect } from "react";
import Fehlertabelle from "./Fehlertabelle";
import { URL_GET_FEHLERSUCHE } from "../constants";
import "./Fehlersuche.css";
import Fehlerzeile from "./Fehlerzeile";

const Fehlersuche = () => {
  const [fehler, setFehler] = useState([]);

  const [titel, setTitel] = useState("");
  const [loesung, setLoesung] = useState("");
  const [status, setStatus] = useState("");
  const [auswirkung, setAuswirkung] = useState("");

  const getFehler = async () => {
    const response = await fetch(URL_GET_FEHLERSUCHE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titel, loesung, status, auswirkung }),
    });

    const jsonData = await response.json();

    if (jsonData.error == true) {
      console.log("keine Fehler gefunden");
      setFehler([]);
    } else {
      setFehler(jsonData.fehler);
    }
  };

  useEffect(() => {
    getFehler();
  }, []);

  return (
    <div className="suchContainer">
      <h1>Suche</h1>
      <div className="field titel" id="titelContainer">
        <label>Titel</label>
        <input
          className="inputField"
          type="text"
          id="titel"
          name="titel"
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
        />
      </div>
      <div className="field" id="loesungContainer">
        <label>Lösung</label>
        <input
          className="inputField"
          type="text"
          id="loesung"
          name="loesung"
          value={loesung}
          onChange={(e) => setLoesung(e.target.value)}
        />
      </div>
      <div className="field" id="statusContainer">
        <label>Status</label>
        <input
          className="inputField"
          type="text"
          id="status"
          name="status"
          value={auswirkung}
          onChange={(e) => setAuswirkung(e.target.value)}
        />
      </div>
      <div className="field" id="auswirkungContainer">
        <label>Auswirkung</label>
        <input
          className="inputField"
          type="text"
          id="auswirkung"
          name="auswirkung"
          value={auswirkung}
          onChange={(e) => setAuswirkung(e.target.value)}
        />
      </div>
      <button id="sucheButton" type="submit" onClick={getFehler}>
        <p className="text">Suche</p>
      </button>
      <div id="tabellenContainer">
        {fehler.map((f) => {
          return (
            <div className="fehlerliste">
              <Fehlerzeile key={f.fehlerid} {...f} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fehlersuche;
/*
 <div className="field">
        <label>Lösung</label>
        <input
          className="inputField"
          type="text"
          id="loesung"
          name="loesung"
          value={loesung}
          onChange={(e) => setLoesung(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Status</label>
        <input
          className="inputField"
          type="text"
          id="status"
          name="status"
          value={auswirkung}
          onChange={(e) => setAuswirkung(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Auswirkung</label>
        <input
          className="inputField"
          type="text"
          id="auswirkung"
          name="auswirkung"
          value={auswirkung}
          onChange={(e) => setAuswirkung(e.target.value)}
        />
      </div>

*/
