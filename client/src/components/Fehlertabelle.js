import React from "react";

import "./Fehlertabelle.css";

import { fehlers } from "./fehlers";
import Fehlerzeile from "./Fehlerzeile";

const Fehlertabelle = () => {
  const [fehlerliste, setFehlerliste] = React.useState(fehlers);
  return (
    <>
      {fehlerliste.map((fehler) => {
        console.log(fehler);
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
