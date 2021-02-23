import React from "react";

const Fehlerzeile = ({ ID, Titel, Status, Software, Datum }) => {
  return (
    <article className="fehler">
      <div className="flex-container">
        <div className="flex-item">
          <p id="id">{ID}</p>
        </div>
        <div className="flex-item">
          <h3>{Titel}</h3>
        </div>
        <div className="flex-item">
          <p>Status: {Status}</p>
        </div>
        <div className="flex-item">
          <p>Software: {Software}</p>
        </div>
        <div className="flex-item">
          <p>Datum: {Datum}</p>
        </div>
      </div>
    </article>
  );
};

export default Fehlerzeile;
