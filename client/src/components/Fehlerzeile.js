import React from "react";
import { useHistory } from "react-router-dom";

const Fehlerzeile = ({
  fehlerid,
  titel,
  status,
  softwarename,
  erstellt_am,
}) => {
  const history = useHistory();

  return (
    <article
      className="fehler"
      onClick={() => history.push("/fehler/ansicht/" + fehlerid)}
    >
      <div className="flex-container">
        <div className="flex-item">
          <p id="Fehler-ID">{fehlerid}</p>
        </div>
        <div className="flex-item">
          <p id="Fehler-Titel">{titel}</p>
        </div>
        <div className="flex-item">
          <p className="Fehler-Tabellen">{status}</p>
        </div>
        <div className="flex-item">
          <p className="Fehler-Tabellen">{softwarename}</p>
        </div>
        <div className="flex-item">
          <p className="Fehler-Tabellen">{erstellt_am.substring(0, 10)}</p>
        </div>
      </div>
    </article>
  );
};

export default Fehlerzeile;
