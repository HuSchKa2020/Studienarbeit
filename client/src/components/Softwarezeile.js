import React from "react";
import { useHistory } from "react-router-dom";
import "./Softwaretabelle.css";

const Softwarezeile = ({ softwareid, softwarename, hersteller }) => {
  const history = useHistory();

  return (
    <div className="Software-container">
      <div className="Software-item">
        <p id="Softid">{softwareid}</p>
      </div>
      <div className="Software-item">
        <p id="SoftName">{softwarename}</p>
      </div>
      <div className="Software-item">
        <p id="SoftHersteller">{hersteller}</p>
      </div>
    </div>
  );
};

export default Softwarezeile;
