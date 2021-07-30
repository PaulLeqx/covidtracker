import { useEffect, useState } from 'react';
import axios from 'axios';
import franceDepartments from "@svg-maps/france.departments";
import {SVGMap} from "react-svg-map";
import Info from '../Info';

import './index.css';

const Map = () => {
  const [lastDepartementName, setLastDepartementName] = useState('');
  const [departementName, setDepartementName] = useState(null);
  const [departementData, setDepartementData] = useState(null);
  const [loading, setLoading] = useState({
    initial: true,
    clicked: false
  });

  const handleClick = (e) => {
    if(e.target.getAttribute('name') === "Ville de Paris") {
      setDepartementName("Paris");
      setLoading({initial: false, clicked: true});
    } else {
      setDepartementName(e.target.getAttribute('name'));
      setLoading({initial: false, clicked: true});
    }
    console.log(e.target);
  }
  const handleFocus = (e) => {
    e.target.setAttribute("aria-checked", true);
  }
  const handleblur = (e) => {
    e.target.setAttribute("aria-checked", false);
  }

  useEffect(() => {
    fetchData()
    .then((response) =>  {
      setDepartementData(response);
      if(response) {
        setLastDepartementName(departementName);
        setLoading({clicked: false, initial: loading.initial});
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [departementName]);

  const fetchData = async () => {
    const response = await axios.get(`https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=${departementName}`);
    const departementAllData = await response.data.allDataByDepartement;
    const lastDepartementData = await departementAllData[departementAllData.length-1];
    console.log(response);
    return lastDepartementData;
  }
  

  return (
    <div>
      {!departementName ? (
        <div>
          <h2 className="commun" >Cliquez sur un departement</h2>
        </div>
      ) : null}
      {departementName === lastDepartementName ? (
        <div className="info commun">
          {/* <h1>{departementData.nom}</h1> */}
          <Info 
            departementName={departementName} 
            departementData={departementData}
          />
        </div>
      ) : 
        null}
      {!loading.initial && loading.clicked ? (
        <div className="lds-container commun">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
      <div className="map--container">        
        <SVGMap 
          map={franceDepartments} 
          onLocationClick={(evt) => handleClick(evt)}
          onLocationFocus={(evt) => handleFocus(evt)}
          onLocationBlur={(evt) => handleblur(evt)}
        />
      </div>
    </div>
  );
}

export default Map;