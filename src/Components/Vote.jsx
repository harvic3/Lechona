import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css'; 

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: this.props.candidates,
      names: [],
      nameSelected: '',
      numberVotes: 0,
      notNumberVote: false, 
      maxVotes: 1000000
    };
  }

  mapCandidatesToArrayName = () => {
    const candidates = [...this.state.candidates];
    const names = candidates.map(cand => (cand.name));
    this.setState({ names });
  }

  handleOnPressVote = () => {
    const name = this.state.nameSelected.value;
    if (!name){
      return;
    }
    const votes = this.state.numberVotes;
    this.props.vote(name, votes);
  }

  handleOnChangeVotes = (event) => {
    const numberVotes = event.target.value;
    if (numberVotes >= 0 && numberVotes <= this.state.maxVotes){
      this.setState({numberVotes});      
    }else{
      alert('El máximo de votos por tanda es de 1 millón!')
    }
  }

  handleOnChangeSelect = (nameSelected) => {
    this.setState({nameSelected: nameSelected});
  }

  componentWillMount() {
    this.mapCandidatesToArrayName();
  }

  render() {
    const { nameSelected } = this.state;    
    const names = this.state.names.map(name => (
        { value: name, label: name }
      )
    );
    return (
        <div className='vote-controls' >
          <div>
            <label>Selecciona tu Candidato</label>
            <div>
              <Select className='select-style'
                value={nameSelected} 
                onChange={this.handleOnChangeSelect} 
                name="candidateNames" id="candidateNames" 
                options={names}
              />
            </div>
          </div>
          <div hidden={!this.state.nameSelected}>
            <div>
              <label>Empieza a Votar</label>
            </div>
            <div>
              <input className='input-style' maxLength="3" min="0" max="300" value={this.state.numberVotes} onChange={this.handleOnChangeVotes} placeholder="Votos reales" type="number" />
              <button disabled={this.notNumberVote} className="btn-vote" onClick={this.handleOnPressVote} >
                Votar
              </button>
            </div>                      
        </div>
      </div>
    );
  }
}

export default Vote;
