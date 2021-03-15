import axios from "axios";
import React, { useState } from "react";
import { URL_POST_FEHLERERSTELLEN } from "../constants";
import "./FehlerErstellen.css";

const Fehlererstellen = () => {
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [lösung, setLösung] = useState("");
  const [auswirkung, setAuswirkung] = useState("");
  const [status, setStatus] = useState("");
  const [softwareid, setSoftwareid] = useState();
  const [anwenderid, setAnwenderid] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Hello");

    console.log(softwareid)
    axios({
      method: "POST",
      data: {
        titel: titel,
        beschreibung: beschreibung,
        lösung: lösung,
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

      <div className="field" id="TitelContainer">
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

      <div className="field" id="BeschreibungContainer">
        <label>Beschreibung</label>
        <input
          className="inputField"
          type="text"
          id="beschreibung"
          name="beschreibung"
          value={beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
        />
      </div>

      <div className="field" id="LoesungContainer">
        <label>Lösung</label>
        <input
          className="inputField"
          type="text"
          id="lösung"
          name="lösung"
          value={lösung}
          onChange={(e) => setLösung(e.target.value)}
        />
      </div>

      <div className="field" id="AuswirkungContainer">
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

      
      <div className="field" id="StatusContainer">
        <label>Status</label>
        <input
          className="inputField"
          type="text"
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      <div className="field" id="SoftwareidContainer">
        <label>SoftwareID</label>
        <input
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

      <div className="field" id="AnwenderidContainer">
        <label>AnwenderID</label>
        <input
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

//ToDo Ticket Nr.

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
      

      
        <div className="dropdown-content" id="SoftwareidDropdown">
          <select style={{width: '300px'}}>
            <option value="1">Sap</option>
            <option value="2">Oracle</option>
            <option value="3">Office365</option>
            <option value="4">Exchange</option>
            <input
            type="number"
            value={softwareid}
            onChange={(e) => setSoftwareid(e.target.value)}
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