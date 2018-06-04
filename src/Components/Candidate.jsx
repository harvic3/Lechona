import React from "react";
import NumberFormat from 'react-number-format';

const candidate = ({ name, icon, votes }) => {
  return (
    <div className="col-md-2 col-sm-6">
      <h2>{name}</h2>
      <img className="candidateImg" src={icon} alt="icon" />
      <div className='votes-label' >
        <span>Votos</span>
        <NumberFormat value={votes} displayType={'text'} thousandSeparator={true} renderText={value => <span>{value}</span>} /> 
      </div>
    </div>
  );
};

export default candidate;
