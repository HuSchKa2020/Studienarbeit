import React from "react";

import "./Fehlertabelle.css";

import Fehlerzeile from "./Fehlerzeile";

const Fehlertabelle = (fehlerarray) => {
  const [fehlerliste, setFehlerliste] = React.useState(fehlerarray.fehlerarray);
  return (
    <>
      {fehlerliste.map((fehler) => {
        return (
          <div className="fehlerliste">
            <Fehlerzeile key={fehler.ID} {...fehler} />
          </div>
        );
      })}
    </>
  );
};

export default Fehlertabelle;
