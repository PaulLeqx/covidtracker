const CountryInfo = ({countryData}) => {
  console.log(countryData);
  return (
    <div className="country--info">
      <h1>France : </h1>
      <ul className="country--info__ul">
        <li className="country--info__li">Décès : {countryData.deces}</li>
        <li className="country--info__li">Guerisons : {countryData.gueris}</li>
        <li className="country--info__li">Hospitalisations : {countryData.hospitalises}</li>
        <li className="country--info__li">Nouvelles Hospitalisations : {countryData.nouvellesHospitalisations}</li>
        <li className="country--info__li">Nouvelles Réanimations : {countryData.nouvellesReanimations}</li>
        <li className="country--info__li">Reanimations : {countryData.reanimation}</li>
      </ul>
    </div>
  );
};


export default CountryInfo;