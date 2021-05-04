import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  URL_GET_ID_FEHLERSUCHE,
  URL_DELETE_FEHLERLOESCHEN,
} from "../constants";

import "./Fehleransicht.css";

const Fehler = () => {
  var path = window.location.pathname;
  path = path.split("/");
  var id = path[3];

  let history = useHistory();
  const [fehler, setFehler] = useState({ erstellt_am: "XXXX-XX-XX" });

  const getFehler = async () => {
    var URL = URL_GET_ID_FEHLERSUCHE + id;
    try {
      const response = await fetch(URL);
      const jsonData = await response.json();

      if (jsonData.error) {
        history.push("/");
      } else {
        setFehler(jsonData.fehler);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFehler();
  }, []);

  const deleteFehler = async (fehlerid) => {
    try {
      const deleteFehler = await fetch(URL_DELETE_FEHLERLOESCHEN + fehlerid, {
        method: "DELETE",
      });

      const json = await deleteFehler.json();
      if (json.error === false) {
        window.location.href = "/fehler";
      } else {
        console.log("Löschen war nicht erfolgreich");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <article className="grid-box" key={fehler.fehlerid}>
      <div className="box-ID">
        <p id="einzelFehlerID">ID: {fehler.fehlerid}</p>
      </div>
      <div className="box-Titel">
        <p id="einzelFehlerTitel">{fehler.titel}</p>
      </div>
      <div id="Ubeschreibung">
        <p className="einFehlerUeber">Beschreibung</p>
      </div>
      <div className="box-Beschreibung">
        <p id="einzelFehlerBeschreibung">{fehler.beschreibung}</p>
      </div>
      <div id="Usoftware">
        <p className="einFehlerUeber">Software</p>
      </div>
      <div className="box-Software">
        <p className="einzelFehlerInhalt">{fehler.softwarename}</p>
      </div>
      <div id="Uauswirkung">
        <p className="einFehlerUeber">Auswirkung</p>
      </div>
      <div className="box-Auswirkung">
        <p className="einzelFehlerInhalt">{fehler.auswirkung}</p>
      </div>
      <div id="Ustatus">
        <p className="einFehlerUeber">Status</p>
      </div>
      <div className="box-Status">
        <p className="einzelFehlerInhalt">{fehler.status}</p>
      </div>
      <div id="Uloesung">
        <p className="einFehlerUeber">Lösung</p>
      </div>
      <div className="box-Loesung">
        <p id="einzelFehlerLoesung">{fehler.loesung}</p>
      </div>
      <div id="Uautor">
        <p className="einFehlerUeber">Autor</p>
      </div>
      <div className="box-Autor">
        <p className="einzelFehlerInhalt">
          {fehler.vorname + " " + fehler.nachname}
        </p>
      </div>
      <div id="Udatum">
        <p className="einFehlerUeber">Datum</p>
      </div>
      <div className="box-Datum">
        <p className="einzelFehlerInhalt">
          {fehler.erstellt_am.substring(0, 10)}
        </p>
      </div>
      <div id="box-Button">
        <button
          className="LoeschenButton"
          onClick={() => deleteFehler(fehler.fehlerid)}
        >
          Löschen
        </button>
      </div>
    </article>
  );
};

export default Fehler;
