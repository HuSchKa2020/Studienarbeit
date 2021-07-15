import React,{Fragment, useState, useEffect}from 'react';
import { URL_GET_SOFTWARE, 
URL_GET_ANWENDER,
URL_GET_ID_FEHLERSUCHE } from '../constants';
import { useHistory } from "react-router-dom";
import * as icon from "react-icons/ai";




const FehlerBearbeiten = () =>{
  var path = window.location.pathname;
  path = path.split("/");
  var id = path[3];
  let history = useHistory();


  const getFehler = async (fehler) => {
    var URL = URL_GET_ID_FEHLERSUCHE + id;
    try {
      const response = await fetch(URL);
      const jsonData = await response.json();

      if (jsonData.error) {
        history.push("/");
      } else {
        setFehler(jsonData.fehler);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    
    getFehler();
  }, []);

  const [fehler, setFehler] = useState("");

  const [titel,setTitel] = useState(fehler.titel);
  const [beschreibung, setBeschreibung] = useState("");
  const [loesung, setLoesung] = useState("");
  const [auswirkung, setAuswirkung] = useState("");
  const [status, setStatus] = useState("");
  const [softwareID, setSoftwareID] = useState("");
  const [anwenderID, setAnwenderID] = useState("");

  const [software, setSoftware] = useState([]);
  const [anwender, setAnwender] = useState([]);

  

    //Get-Abfrage für Software-Dropdown
    React.useEffect(() => {
      const getSoftware = async () => {
        var url = URL_GET_SOFTWARE;
  
        const response = await fetch(url);
  
        const jsonData = await response.json();
  
        if (jsonData.error === true) {
          console.log("keine software gefunden");
        } else {
          setSoftware(jsonData.software);
        }
      };
      getSoftware();
    }, []);
  
    //Get-Abfrage für Anwender-Dropdown
    React.useEffect(() => {
      const getAnwender = async () => {
        var url = URL_GET_ANWENDER;
  
        const response = await fetch(url);
  
        const jsonData = await response.json();
  
        if (jsonData.error === true) {
          console.log("keine software gefunden");
        } else {
          setAnwender(jsonData.anwender);
        }
      };
      getAnwender();
    }, []);

    console.log(fehler);

  return(
  <Fragment>
    
<button type="button" className="FehlerBearbeiten" data-toggle="modal" data-target="#myModal"> 
<icon.AiOutlineEdit />
      </button>


<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

  
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times; </button>
        <h4 class="modal-title">Modal Header</h4>
      </div>


      <div class="modal-body">

        <label id="TitelBearbeitenLabel">Titel</label>
        <div id="TitelBearbeitenContainer">
          <input
            type="text"
            id="TitelBearbeitenTextfeld"
            name="Titel"
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
          >
            
          </input>
        </div>


      <label id="BeschreibungBearbeitenLabel">Beschreibung</label>

      <div id="BeschreibungBearbeitenContainer">
        <textarea
          style={{width:1000 ,height:50}}
          type="text"
          id="BeschreibungBearbeitenTextfeld"
          name="Beschreibung"
          value={fehler.beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
          ></textarea>
      </div>


      <label id="AuswirkungBearbeitenLabel">Auswirkung</label>

      <select
          id="AuswirkungBearbeitenContainer"
          onChange={(e) => setAuswirkung(e.target.value)}
          value={fehler.auswirkung}>
          <option value=""></option>
          <option value="niedrig">Niedrig</option>
          <option value="mittel">Mittel</option>
          <option value="Hoch">Hoch</option>
      </select>


      <label id="LösungBearbeitenLabel">Lösung</label>

      <div id="LoesungBearbeitenContainer">
      <input
          type="text"
          id="loesung"
          name="Loesung"
          value={fehler.loesung}
          onChange={(e) => setLoesung(e.target.value)}
      />
      </div>

      <label id="StatusBearbeitenLabel">Status</label>

      <select 
          id="StatusBearbeitenContainer" 
          value={fehler.status} 
          onChange={(e) => setStatus(e.target.value)}>

        <option value=""></option>
        <option value="behoben">behoben</option>
        <option value="offen">offen</option>
      </select>


      <label id="SoftwareIDBearbeitenLabel">Software</label>

      <select
        id="SoftwareidBearbeitenContainer"
        onChange={(e) => setSoftwareID(e.target.value)}
        value={softwareID}>

        <option value=""></option>
        {software.map((softwares) => (
          <option value={softwares.softwareid}>{softwares.softwarename}</option>
        ))}
      </select>

      <select
        id="AnwenderidBearbeitenContainer"
        onChange={(e) => setAnwenderID(e.target.value)}
        value={fehler.anwenderID}>

        <option value=""></option>
        {anwender.map((anwender) => (
          <option value={anwender.anwenderid}>
            {anwender.vorname} {anwender.nachname}
          </option>
        ))}
      </select>


        <p>Some text in the modal.</p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
  </Fragment>
  )
};

export default FehlerBearbeiten;