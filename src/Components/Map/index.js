import axios from 'axios';
import franceDepartments from "@svg-maps/france.departments";
import {SVGMap} from "react-svg-map";

const Map = () => {
  const handleOver = (e) => {
    const departement = e.target;
    const departementName = departement.getAttribute('name');
    console.log(departementName);

  }

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