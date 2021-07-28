import { useEffect, useState } from 'react';
import axios from 'axios';
import franceDepartments from "@svg-maps/france.departments";
import {SVGMap} from "react-svg-map";

const Map = () => {
  // const [lastDepartementName, setLastDepartementName] = useState(null);
  const [departementName, setDepartementName] = useState(null);
  const [departementData, setDepartementData] = useState(null);
  // const [toggleFetch, setToggleFetch] = useState(false);

  const handleOver = (e) => {
    setDepartementName(e.target.getAttribute('name'));
  }

  useEffect(() => {
    fetchData()
    .then((response) =>  {
      console.log(response);
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
      <SVGMap 
        map={franceDepartments} 
        onLocationMouseOver={(evt) => handleOver(evt)}
        //onLocationMouseExit={() => handleMouseOut()}
      />
    </div>
  );
}

export default Map;