import React, { useState, useEffect } from "react";
import Fehlertabelle from "./Fehlertabelle";
import { URL_GET_FEHLERSUCHE, URL_GET_SOFTWARE } from "../constants";
import "./Fehlersuche.css";
import Fehlerzeile from "./Fehlerzeile";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Fehlersuche = () => {
  const [fehler, setFehler] = useState([]);

  const [titel, setTitel] = useState("");
  const [loesung, setLoesung] = useState("");
  const [status, setStatus] = useState("");
  const [auswirkung, setAuswirkung] = useState("");
  const [software, setSoftware] = useState([]); // alle Softwares im Dropdown
  const [ausgewaehlteSoftware, setausgewaehlteSoftware] = useState("");
  const [date, setDate] = useState(null);

  const getFehler = async () => {
    // URL bauen
    var params = {
      titel,
      status,
      loesung,
      auswirkung,
      softwareid: ausgewaehlteSoftware,
      date,
    };

    var url =
      URL_GET_FEHLERSUCHE +
      "?titel=" +
      params.titel +
      "&status=" +
      params.status +
      "&loesung=" +
      params.loesung +
      "&auswirkung=" +
      params.auswirkung +
      "&softwareid=" +
      params.softwareid;

    console.log(date);
    console.log(date === null);
    if (date !== null) url += "&date=" + params.date;

    const response = await fetch(url);

    const jsonData = await response.json();

    if (jsonData.error == true) {
      console.log("keine Fehler gefunden");
      setFehler([]);
    } else {
      setFehler(jsonData.fehler);
    }
  };

  const fetchSoftware = async () => {
    var url = URL_GET_SOFTWARE;
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    if (jsonData.error === true) {
      console.log("keine software gefunden");
    } else {
      setSoftware(jsonData.software);
    }
  };

  useEffect(() => {
    getFehler();
    fetchSoftware();
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
      <div className="field" id="dateContainer">
        <div style={{ display: "flex" }}>
          <label>Datum</label>
          <label onClick={() => setDate(null)} className="link">
            Clear
          </label>
        </div>
        <DatePicker
          id="DateSuche"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>
      <div className="field" id="statusContainer">
        <label>Status</label>
        <select
          id="StatusSuche"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value=""></option>
          <option value="behoben">behoben</option>
          <option value="offen">offen</option>
        </select>
      </div>
      <div className="field" id="auswirkungContainer">
        <label>Auswirkung</label>
        <select
          id="AuswirkungSuche"
          onChange={(e) => setAuswirkung(e.target.value)}
          value={auswirkung}
        >
          <option value=""></option>
          <option value="niedrig">Niedrig</option>
          <option value="mittel">Mittel</option>
          <option value="Hoch">Hoch</option>
        </select>
      </div>
      <div className="field" id="softwareContainer">
        <label>Software</label>
        <select
          id="SoftwareSuche"
          onChange={(e) => setausgewaehlteSoftware(e.target.value)}
        >
          <option value=""></option>
          {software.map((software) => (
            <option value={software.softwareid}>{software.softwarename}</option>
          ))}
        </select>
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

        <hr id="linie" />

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
