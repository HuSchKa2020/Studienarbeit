import React from "react";
import { useHistory } from "react-router-dom";

// ToDo Datum in Datebank zum fehler
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
          <p id="id">{fehlerid}</p>
        </div>
        <div className="flex-item">
          <h3>{titel}</h3>
        </div>
        <div className="flex-item">
          <p>{status}</p>
        </div>
        <div className="flex-item">
          <p>{softwarename}</p>
        </div>
        <div className="flex-item">
          <p>{erstellt_am.substring(0, 10)}</p>
        </div>
      </div>
    </article>
  );
};

export default Fehlerzeile;
