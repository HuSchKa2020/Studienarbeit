import axios from "axios";
import React, { useState } from "react";
import { URL_POST_FEHLERERSTELLEN } from "../constants";
import "./FehlerErstellen.css";

const Fehlererstellen = () => {
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [loesung, setLoesung] = useState("");
  const [auswirkung, setAuswirkung] = useState("");
  const [status, setStatus] = useState("");
  const [softwareid, setSoftwareid] = useState("");
  const [anwenderid, setAnwenderid] = useState("");

  const handleSubmit = (e) => {

    //e.preventDefault();

    axios({
      method: "POST",
      data: {
        titel: titel,
        beschreibung: beschreibung,
        loesung: loesung,
        auswirkung: auswirkung,
        status: status,
        softwareid: softwareid,
        anwenderid: anwenderid,
      },
      withCredentials: true,
      url: URL_POST_FEHLERERSTELLEN,
    }).then((res) => {
      console.log(res);
      const data = res.data;
      if(data.success === true) {
        //erstellen eines Fehlers erfolgreich
        console.log(data.message);
      }else{
        //eintrag konnte nicht erstellt werden
        console.log(data.message);
      }
    });
  };

  return (
    <div className="ErstellContainer">
      <h1 id="ueberschrift">Fehler erstellen</h1>

      
      <label id="TitelLabel">Titel</label>

      <div className="field" id="TitelContainer">
        <input
          style={{width: '550px'}}
          className="inputField"
          type="text"
          id="titel"
          name="titel"
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
        />
      </div>

      <label id="BeschreibungLabel">Beschreibung</label>

      <div className="field" id="BeschreibungContainer" >
        <input
          style={{width: '550px'}}
          className="inputField"
          type="text"
          id="beschreibung"
          name="beschreibung"
          value={beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
        />
      </div>

      <label id="AuswirkungLabel">Auswirkung</label>

      <div className="field" id="AuswirkungContainer">
        <input
          style={{width: '550px'}}
          className="inputField"
          type="text"
          id="auswirkung"
          name="auswirkung"
          value={auswirkung}
          onChange={(e) => setAuswirkung(e.target.value)}
        />
      </div>


      <label id="LösungLabel">Lösung</label>

      <div className="field" id="LoesungContainer">
        <input
          style={{width: '550px'}}
          className="inputField"
          type="text"
          id="loesung"
          name="loesung"
          value={loesung}
          onChange={(e) => setLoesung(e.target.value)}
        />
      </div>

      <label id="StatusLabel">Status</label>

      <div className="field" id="StatusContainer">
        <input
          style={{width: '550px'}}
          className="inputField"
          type="text"
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <label id="SoftwareIDLabel">SoftwareID</label>

      

      <div className="field" id="SoftwareidContainer">
        <input
          style={{width: '550px'}}
          className="inputField"
          type="number"
          id="softwareid"
          name="softwareid"
          min="1"
          max="10"
          step="1"
          value={softwareid}
          onChange={(e) => setSoftwareid(e.target.value)}
  
        />
      </div>

      <label id="AnwenderIDLabel">AnwenderID</label>

      <div className="field" id="AnwenderidContainer">
        <input
          style={{width: '550px'}}
          className="inputField"
          type="number"
          id="anwenderid"
          name="anwenderid"
          min="1"
          max="10"
          step="1"
          value={anwenderid}
          onChange={(e) => setAnwenderid(e.target.value)}
        />
      </div>
      
      
      <button
        className="btn neutral"
        id="btnFehlerErstellen"
        type="submit"
        onClick={handleSubmit}
        >
          <p className="text">erstellen</p>
        </button>
    </div>
  );
}

export default Fehlererstellen;

//ToDo Ticket Nr. 34

/*
       <div className="dropdown-content" id="StatusDropdown">
          <select id="Statusdropdown-list"  style={{width: '300px'}}
          >
            <option value="behoben">behoben</option>
            <option value="nicht behoben">nicht behoben</option>
            <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            />
            </select>
        </div>
      

      

          
      

     
        <div className="dropdown-content" id="AnwenderidDropdown">
          <select style={{width: '300px'}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <input
            type="number"
            value={anwenderid}
            onChange={(e) => setAnwenderid(e.target.value)}
          />
            </select>
          
        </div>
*/