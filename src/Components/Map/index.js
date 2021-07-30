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
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    setDepartementName(e.target.getAttribute('name'));
  }

  useEffect(() => {
    setLoading(true);
    fetchData()
    .then((response) =>  {
      setDepartementData(response);
      //console.log(response);
      if(response) {
        setLastDepartementName(departementName);
        setLoading(false);
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
      {loading ? (
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
        />
      </div>
    </div>
  );
}

export default Map;