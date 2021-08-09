
const Info = ({...props}) => {
  return (
    <div className="info--content">
      <h2>{props.departementData.nom}</h2>
      <ul>
        <li>Décès : {props.departementData.deces}</li>
        <li>Guerisons : {props.departementData.gueris}</li>
        <li>Hospitalisations : {props.departementData.hospitalises}</li>
        <li>Nouvelles Hospitalisations : {props.departementData.nouvellesHospitalisations}</li>
        <li>Nouvelles réanimations : {props.departementData.nouvellesReanimations}</li>
        <li>Reanimations : {props.departementData.reanimation}</li>
      </ul>
    </div>
  );
};

export default Info;