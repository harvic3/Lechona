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
      maxVotes: this.props.maxVotes
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
    if (votes === 0){
      debugger;
      this.props.showNotify('bad', 'No puedes votar cero!', true);      
      return;      
    }
    this.props.vote(name, votes);
  }

  handleOnChangeVotes = (event) => {
    const numberVotes = event.target.value;
    if (numberVotes >= 0 && numberVotes <= this.state.maxVotes){
      this.setState({numberVotes});      
    }else{
      debugger;
      this.props.showNotify('bad', 'El máximo de votos por tanda es de un millón!', true);
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
        <div className='vote-controls col-12 justify-content-center' >
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
              <input className='input-style' maxLength="7" min="1" max="1000000" value={this.state.numberVotes} onChange={this.handleOnChangeVotes} placeholder="Votos reales" type="number" />
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
