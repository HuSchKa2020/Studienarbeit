import React from "react";
import { useHistory } from "react-router-dom";

const Fehlerlisten = ({ fehlerid, titel, softwarename, erstellt_am }) => {
  const history = useHistory();

  return (
    <article
      className="fehler-home"
      onClick={() => history.push("/fehler/ansicht/" + fehlerid)}
    >
      <div className="flex-container-home">
        <div className="flex-item-home">
          <p id="liste-home-schrift-titel">{titel}</p>
        </div>
        <div className="flex-item-home">
          <p className="liste-home-schrift">{softwarename}</p>
        </div>
        <div className="flex-item-home">
          <p className="liste-home-schrift">{erstellt_am.substring(0, 10)}</p>
        </div>
      </div>
    </article>
  );
};

export default Fehlerlisten;
