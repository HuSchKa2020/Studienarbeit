import React, { useState, useEffect } from "react";
import "./Home.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Fehlerliste from "./Fehlerliste";

import { URL_GET_FEHLERSUCHE } from "../constants";

function Home() {
  const [fehler, setFehler] = useState([]);

  const getFehler = async () => {
    var url = URL_GET_FEHLERSUCHE + "?auswirkung=Hoch";

    const response = await fetch(url);

    const jsonData = await response.json();

    console.log(jsonData);

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
    <div>
      <h4 id="Uberschrift-Home">Home</h4>
      <div className="grid-home">
        <div className="grid-home-item">
          <h4 id="HomeSchrift">Wichtige Störungen</h4>
          <hr id="linie2" />
          {fehler.map((f) => {
            return (
              <div className="fehlerliste-home">
                <Fehlerliste key={f.fehlerid} {...f} />
              </div>
            );
          })}
        </div>
        <div className="grid-home-item">
          <div className="Kalender">
            <Calendar id="Calender"></Calendar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
