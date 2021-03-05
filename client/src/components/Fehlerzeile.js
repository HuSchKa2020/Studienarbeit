import React from "react";

// ToDo Datum in Datebank zum fehler
const Fehlerzeile = ({ fehlerid, titel, status, softwarename }) => {
  return (
    <article className="fehler">
      <div className="flex-container">
        <div className="flex-item">
          <p id="id">{fehlerid}</p>
        </div>
        <div className="flex-item">
          <h3>{titel}</h3>
        </div>
        <div className="flex-item">
          <p>Status: {status}</p>
        </div>
        <div className="flex-item">
          <p>Software: {softwarename}</p>
        </div>
        <div className="flex-item">
          <p>Datum: XX.XX.XXXX</p>
        </div>
      </div>
    </article>
  );
};

export default Fehlerzeile;
