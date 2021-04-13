import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Fehleransicht.css";

const Fehler = () => {
  var path = window.location.pathname; // /fehler/ansicht/2
  path = path.split("/"); // [3] = id
  var id = path[3];

  let history = useHistory();
  const [fehler, setFehler] = useState({});

  const getFehler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/fehler/${id}`);
      const jsonData = await response.json();

      console.log(jsonData.fehler);

      if (jsonData.error) {
        history.push("/");
      } else {
        setFehler(jsonData.fehler);
      }
      console.log(fehler);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFehler();
  }, []);

  return (
    <article className="grid-box">
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
        <p className="einzelFehlerInhalt">{fehler.softwareid}</p>
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
        <p className="einzelFehlerInhalt">{fehler.autor}</p>
      </div>
      <div id="Udatum">
        <p className="einFehlerUeber">Datum</p>
      </div>
      <div className="box-Datum">
        <p className="einzelFehlerInhalt">{fehler.erstellt_am}</p>
      </div>
    </article>
  );
};

export default Fehler;
