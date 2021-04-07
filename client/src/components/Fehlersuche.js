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
    // URL bauen
    var params = { titel, status, loesung, auswirkung };

    var url =
      URL_GET_FEHLERSUCHE +
      "?titel=" +
      params.titel +
      "&status=" +
      params.status +
      "&loesung=" +
      params.loesung +
      "&auswirkung=" +
      params.auswirkung;

    const response = await fetch(url);

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
      <h1 id="ueberschrift">Suche</h1>
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
      <button
        className="btn neutral"
        id="sucheButton"
        type="submit"
        onClick={getFehler}
      >
        <p className="buttontext">Suche</p>
      </button>

      <div id="tabellenContainer">
        <div className="flex-container-kopf">
          <div className="flex-item-kopf">
            <p id="kopfid">ID</p>
          </div>
          <div className="flex-item-kopf">
            <p id="kopftitel">Titel</p>
          </div>
          <div className="flex-item-kopf">
            <p className="kopf">Status</p>
          </div>
          <div className="flex-item-kopf">
            <p className="kopf">Software</p>
          </div>
          <div className="flex-item-kopf">
            <p className="kopf">Datum</p>
          </div>
        </div>

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
