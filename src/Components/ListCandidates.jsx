import React from "react";
import Candidate from "./Candidate";

const arrayToComponent = candidates =>
  candidates.map(candidate => (
    <Candidate key={candidate.name}
      name={candidate.name}
      icon={candidate.image}
      votes={candidate.votes}
    />
  ));

const listCandidates = ({ candidates }) => {
  return (
    <div className="row col-12 col-sm-12 col-md-12 justify-content-center">
      {arrayToComponent(candidates)}
    </div>
  )
};

export default listCandidates;
