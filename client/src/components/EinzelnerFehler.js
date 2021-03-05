import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Fehleransicht.css";

var path = window.location.pathname; // /fehler/ansicht/2
path = path.split("/"); // [3] = id
var id = path[3];

console.log(id);

const Fehler = () => {
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
        <p>{fehler.fehlerid}</p>
      </div>
      <div className="box-Titel">
        <h2>
          Titel: <br />
          {fehler.titel}
        </h2>
      </div>
      <div className="box-Beschreibung">
        <p id="beschreibung">
          <b> Beschreibung:</b> <br />
          {fehler.beschreibung}
        </p>
      </div>
      <div className="box-Software">
        <p>
          <b> Software:</b> <br />
          {fehler.software}
        </p>
      </div>
      <div className="box-Auswirkung">
        <p>
          <b> Auswirkung:</b> <br />
          {fehler.auswirkung}
        </p>
      </div>
      <div className="box-Status">
        <p>
          <b> Status:</b> <br />
          {fehler.status}
        </p>
      </div>
      <div className="box-Loesung">
        <p id="loesung">
          <b> Lösung:</b> <br />
          {fehler.lösung}
        </p>
      </div>
      <div className="box-Autor">
        <p>
          <b> Autor:</b> <br />
          {fehler.autor}
        </p>
      </div>
      <div className="box-Datum">
        <p>
          <b> Datum:</b> <br />
          {fehler.datum}
        </p>
      </div>
    </article>
  );
};

export default Fehler;
