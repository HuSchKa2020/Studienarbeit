import axios from "axios";
import React, { useState, useEffect, Component } from "react";
import {
  URL_POST_FEHLERERSTELLEN,
  URL_GET_SOFTWARE,
  URL_GET_ANWENDER,
} from "../constants";
import "./FehlerErstellen.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Fehlererstellen = () => {
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [loesung, setLoesung] = useState("");
  const [auswirkung, setAuswirkung] = useState("");
  const [status, setStatus] = useState("");
  const [softwareID, setSoftwareID] = useState("");
  const [anwenderID, setAnwenderID] = useState("");

  const [software, setSoftware] = useState([]);
  const [anwender, setAnwender] = useState([]);

  //Get-Abfrage für Software-Dropdown
  React.useEffect(() => {
    const getSoftware = async () => {
      var url = URL_GET_SOFTWARE;

      const response = await fetch(url);

      const jsonData = await response.json();

      if (jsonData.error === true) {
        console.log("keine software gefunden");
      } else {
        setSoftware(jsonData.software);
      }
    };
    getSoftware();
  }, []);

  //Get-Abfrage für Anwender-Dropdown
  React.useEffect(() => {
    const getAnwender = async () => {
      var url = URL_GET_ANWENDER;

      const response = await fetch(url);

      const jsonData = await response.json();

      if (jsonData.error === true) {
        console.log("keine software gefunden");
      } else {
        setAnwender(jsonData.anwender);
      }
    };
    getAnwender();
  }, []);

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const body = JSON.stringify({
      titel: titel,
      beschreibung: beschreibung,
      loesung: loesung,
      auswirkung: auswirkung,
      status: status,
      softwareid: softwareID,
      anwenderid: anwenderID,
    });

    const response = await fetch(URL_POST_FEHLERERSTELLEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const json = await response.json();

    if (json.error === false) {
      //erstellen eines Fehlers erfolgreich
      toast.success(json.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
        closeOnClick: false,
        hideProgressBar: false,
      });
    } else {
      //eintrag konnte nicht erstellt werden
      toast.error(json.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
        closeOnClick: false,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="ErstellContainer">
      <h1 id="ueberschriftErstellen">Fehler erstellen</h1>

      <label id="TitelLabel">Titel</label>

      <div className="field" id="TitelContainer">
        <input
          className="inputField"
          type="text"
          id="titel"
          name="titel"
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
        />
      </div>

      <label id="BeschreibungLabel">Beschreibung</label>

      <div className="field" id="BeschreibungContainer">
      <textarea
          style={{width:1000 ,height:50}}
          className="inputField"
          type="text"
          id="beschreibung"
          name="beschreibung"
          value={beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
        ></textarea>
      </div>

      <label id="AuswirkungLabel">Auswirkung</label>

      <select
        id="AuswirkungContainer"
        onChange={(e) => setAuswirkung(e.target.value)}
      >
        <option value=""></option>
        <option value="niedrig">Niedrig</option>
        <option value="mittel">Mittel</option>
        <option value="Hoch">Hoch</option>
      </select>

      <label id="LösungLabel">Lösung</label>

      <div className="field" id="LoesungContainer">
        <input
          className="inputField"
          type="text"
          id="loesung"
          name="loesung"
          value={loesung}
          onChange={(e) => setLoesung(e.target.value)}
        />
      </div>

      <label id="StatusLabel">Status</label>

      <select id="StatusContainer" onChange={(e) => setStatus(e.target.value)}>
        <option value=""></option>
        <option value="behoben">behoben</option>
        <option value="offen">offen</option>
      </select>

      <label id="SoftwareIDLabel">Software</label>

      <select
        id="SoftwareidContainer"
        onChange={(e) => setSoftwareID(e.target.value)}
      >
        <option value=""></option>
        {software.map((softwares) => (
          <option value={softwares.softwareid}>{softwares.softwarename}</option>
        ))}
      </select>

      <label id="AnwenderIDLabel">Anwender</label>

      <select
        id="AnwenderidContainer"
        onChange={(e) => setAnwenderID(e.target.value)}
      >
        <option value=""></option>
        {anwender.map((anwender) => (
          <option value={anwender.anwenderid}>
            {anwender.vorname} {anwender.nachname}
          </option>
        ))}
      </select>

      <button
        className="btn neutral"
        id="btnFehlerErstellen"
        type="submit"
        onClick={handleSubmit}
      >
        <p className="buttontext">Erstellen</p>
      </button>
    </div>
  );
};

export default Fehlererstellen;


