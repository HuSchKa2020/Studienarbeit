import React from "react";

import "./Softwaretabelle.css";

import Softwarezeile from "./Softwarezeile";

const Softwaretabelle = (softwarearray) => {
  const [softwareliste, setSoftwareliste] = React.useState(softwarearray.softwarearray);
  return (
    <>
      {softwareliste.map((software) => {
        return (
          <div className="softwareliste">
            <Softwarezeile key={software.ID} {...software} />
          </div>
        );
      })}
    </>
  );
};

export default Softwaretabelle;