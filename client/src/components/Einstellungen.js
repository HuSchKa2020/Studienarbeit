import React, { useState, useEffect, Component } from "react";
import { URL_POST_SOFTWARE, URL_GET_SOFTWARE } from "../constants";
import "./Einstellungen.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Softwarezeile from "./Softwarezeile";
import Softwaretabelle from "./Softwaretabelle";

const Einstellungen = () => {
  const [hersteller, setHersteller] = useState("");
  const [softwarename, setSoftwarename] = useState("");
  const [software, setSoftware] = useState([]);


  const handleSubmit = async (e) => {
    //e.preventDefault();

    const body = JSON.stringify({
      hersteller: hersteller,
      softwarename: softwarename,
    });

    const response = await fetch (URL_POST_SOFTWARE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const json = await response.json();
    
    if(json.error === false) {
      toast.success(json.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
        closeOnClick: false,
        hideProgressBar: false,
      });

      setHersteller("");
      setSoftwarename("");

    }else {
            //eintrag konnte nicht erstellt werden
            toast.error(json.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 6000,
              closeOnClick: false,
              hideProgressBar: false,
            });
    }
  };

  const getSoftware = async() => {

    var url = URL_GET_SOFTWARE

    const response = await fetch(url);
    const jsonData = await response.json(url);

    if (jsonData.error === true){
      console.log("keine Fehler gefunden");
      setSoftware([]);
    }else {
      setSoftware(jsonData.software);
    }
  };

  useEffect(() => {
    getSoftware();
  }, []);

  return (
    <div className="SoftwareContainer">

      <h1 id="ueberschriftSoftware">Software hinzufügen</h1>


      <label id="HerstellerLabel">Hersteller</label>
      <div className="field" id="HerstellerContainer">
        <input
          className="inputField"
          type="text"
          id="hersteller"
          name="hersteller"
          value={hersteller}
          onChange={(e) => setHersteller(e.target.value)}
        />
      </div>


      <label id="SoftwarenameLabel">Softwarename</label>
      <div className="field" id="SoftwarenameContainer">
        <input
          className="inputField"
          type="text"
          id="softwarename"
          name="softwarename"
          value={softwarename}
          onChange={(e) => setSoftwarename(e.target.value)}
        />
      </div>

      <button
      className="btn neutral"
      id="btnSoftwareErstellen"
      type="submit"
      onClick={handleSubmit}
      >
        <p className="buttontext">Erstellen</p>
      </button>


      <div id="SoftwaretabellenContainer">
        <div className="Software-container-kopf">
          <div className="Software-item-kopf">
            <p id="SoftwareID">ID</p>
          </div>

          <div className="Software-item-kopf">
            <p className="kopfSoftware">Softwarename</p>
          </div>
          <div className="Software-item-kopf">
            <p  className="kopfSoftware">Softwarehersteller</p>
          </div>
        </div>

        <hr id="linie" />

        {software.map((s) => {
          return (
            <div className="softwareliste">
              <Softwarezeile key={s.softwareid} {...s} />
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Einstellungen;