import React, { Fragment, useState, useEffect } from "react";
import {
  URL_GET_SOFTWARE,
  URL_GET_ANWENDER,
  URL_GET_ID_FEHLERSUCHE,
  URL_PUT_FEHLERBEARBEITEN,
} from "../constants";
import { useHistory } from "react-router-dom";
import * as icon from "react-icons/ai";
import { toast } from "react-toastify";

import "./FehlerBearbeiten.css";

const FehlerBearbeiten = () => {

  var path = window.location.pathname;
  path = path.split("/");
  var id = path[3];
  let history = useHistory();

  const getFehler = async () => {
    var URL = URL_GET_ID_FEHLERSUCHE + id;
    try {
      const response = await fetch(URL);
      const jsonData = await response.json();

      if (jsonData.error) {
        history.push("/");
      } else {
        setFehler(jsonData.fehler);
        setID(jsonData.fehler.fehlerid);
        setTitel(jsonData.fehler.titel);
        setBeschreibung(jsonData.fehler.beschreibung);
        setLoesung(jsonData.fehler.loesung);
        setAuswirkung(jsonData.fehler.auswirkung);
        setStatus(jsonData.fehler.status);
        //setSoftwareID(jsonData.fehler.softwareID);
        //setAnwenderID(jsonData.fehler.anwenderID);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFehler();
  }, []);

  const [fehler, setFehler] = useState("");

  const [fehlerid, setID] = useState("");
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [loesung, setLoesung] = useState("");
  const [auswirkung, setAuswirkung] = useState("");
  const [status, setStatus] = useState("");
  const [softwareID, setSoftwareID] = useState("");
  const [anwenderID, setAnwenderID] = useState("");

  const [software, setSoftware] = useState([]);
  const [anwender, setAnwender] = useState([]);

  console.log(softwareID);

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

    var timeout = setTimeout ("windows.location.reload();",6000);
    const closeWindow = async() =>{
      
      clearTimeout(timeout);
      timeout = setTimeout("window.location.reload();",6000);
      
      //window.location.reload();
    }

    e.preventDefault();

    const body = JSON.stringify({
      titel: titel,
      beschreibung: beschreibung,
      loesung: loesung,
      auswirkung: auswirkung,
      status: status,
      softwareid: softwareID,
      anwenderid: anwenderID,
    });

    const response = await fetch(URL_PUT_FEHLERBEARBEITEN + fehlerid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const json = await response.json();

    if (json.error === false) {
      toast.success(json.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
        closeOnClick: false,
        hideProgressBar: false,
      });

      closeWindow();
      //setVisible(false)

    } else {
      toast.error(json.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
        closeOnClick: false,
        hideProgressBar: false,
      });
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="FehlerBearbeiten"
        data-toggle="modal"
        data-target="#myModal"
      >
        <icon.AiOutlineEdit />
      </button>

      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          {" "}
          <div class="modal-content">
            <div class="modal-header">
              {" "}
              <h4 id="BearbeitenHeadTitel">Fehler bearbeiten</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;{" "}
              </button>
            </div>

            <div class="modal-body">
              <label id="TitelBearbeitenLabel">Titel</label>
              <div id="TitelBearbeitenContainer">
                <input
                  type="text"
                  id="TitelBearbeitenTextfeld"
                  name="Titel"
                  value={titel}
                  onChange={(e) => setTitel(e.target.value)}
                ></input>
              </div>

              <label id="BeschreibungBearbeitenLabel">Beschreibung</label>

              <div id="BeschreibungBearbeitenContainer">
                <textarea
                  style={{ width: 650, height: 100 }}
                  type="text"
                  id="BeschreibungBearbeitenTextfeld"
                  name="Beschreibung"
                  value={beschreibung}
                  onChange={(e) => setBeschreibung(e.target.value)}
                ></textarea>
              </div>

              <label id="AuswirkungBearbeitenLabel">Auswirkung</label>

              <select
                id="AuswirkungBearbeitenContainer"
                onChange={(e) => setAuswirkung(e.target.value)}
                value={auswirkung}
              >
                <option value=""></option>
                <option value="niedrig">Niedrig</option>
                <option value="mittel">Mittel</option>
                <option value="Hoch">Hoch</option>
              </select>

              <label id="StatusBearbeitenLabel">Status</label>

              <select
                id="StatusBearbeitenContainer"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value=""></option>
                <option value="behoben">behoben</option>
                <option value="offen">offen</option>
              </select>
              <label id="SoftwareIDBearbeitenLabel">Software</label>
              <select
                id="SoftwareidBearbeitenContainer"
                onChange={(e) => setSoftwareID(e.target.value)}
                value={softwareID}
              >
                <option value=""></option>
                {software.map((softwares) => (
                  <option value={softwares.softwareid}>
                    {softwares.softwarename}
                  </option>
                ))}
              </select>

              <div>
                <label id="LösungBearbeitenLabel">Lösung</label>
              </div>

              <div id="LoesungBearbeitenContainer">
                <input
                  type="text"
                  id="LoesungBearbeitenText"
                  name="Loesung"
                  value={loesung}
                  onChange={(e) => setLoesung(e.target.value)}
                />
              </div>

              <label id="AnwenderBearbeitenLabel">Anwender</label>

              <select
                id="AnwenderidBearbeitenContainer"
                onChange={(e) => setAnwenderID(e.target.value)}
                value={anwenderID}
              >
                <option value=""></option>
                {anwender.map((anwender) => (
                  <option value={anwender.anwenderid}>
                    {anwender.vorname} {anwender.nachname}
                  </option>
                ))}
              </select>
            </div>

            <div class="modal-footer">
              <button
                id="btnFehlerÜberarbeiten"
                type="submit"
                onClick={handleSubmit}
              >
                <p id="buttontextBearbeiten">Bearbeiten</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FehlerBearbeiten;
