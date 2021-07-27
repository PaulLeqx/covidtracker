import { useEffect, useState } from 'react';
import axios from 'axios';
import franceDepartments from "@svg-maps/france.departments";
import {SVGMap} from "react-svg-map";

const Map = () => {
  const [lastDepartementName, setLastDepartementName] = useState(null);
  const [departementName, setDepartementName] = useState(null);
  const [departementData, setDepartementData] = useState(null);
  const handleOver = (e) => {
    const departement = e.target;
    setDepartementName(departement.getAttribute('name'));
  }

  useEffect(() => {
    if(departementName && !departementData || departementName !== lastDepartementName) {
      const fetchData = async () => {
        await axios.get(`https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=${departementName}`)
        .then((response) => {
          let departementAllData = response.data.allDataByDepartement;
          let departementLastData = departementAllData[departementAllData.length-1];
          setDepartementData(departementLastData);
          setLastDepartementName(departementName);
        })
        .catch((error) => {
          console.log(error);
        })
      }
      fetchData();

    }

    if(departementData !== null && departementName === departementData.nom) {
      console.log(departementData);
    }
  }, [departementName, departementData]);

  return (
    <div>
      <SVGMap 
        map={franceDepartments} 
        onLocationMouseOver={(evt) => handleOver(evt)}
      />
    </div>
  );
}

export default Map;