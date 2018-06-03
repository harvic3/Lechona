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
    <div className="candidateList">
      {arrayToComponent(candidates)}
    </div>
  )
};

export default listCandidates;
