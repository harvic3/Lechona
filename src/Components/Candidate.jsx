import React from "react";

const candidate = ({ name, icon, votes }) => {
  return (
    <div className="candidate">
      <h2>{name}</h2>
      <img className="candidateImg" src={icon} alt="icon" />
      <div className='votes-label' >
        <span>Votos</span>
        <span>{votes}</span>
      </div>
    </div>
  );
};

export default candidate;
