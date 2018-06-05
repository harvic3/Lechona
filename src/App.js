import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NotificationAlert from 'react-notification-alert';
import SweetAlert from 'react-bootstrap-sweetalert';
import NumberFormat from 'react-number-format';

import ListCandidates from './Components/ListCandidates';
import Vote from './Components/Vote';
import Intructions from './Components/Intructions';

import imgVargas from './Img/waist.svg';
import imgFajardo from './Img/sleep.svg';
import imgPetro from './Img/avocado.svg';
import imgCalle from './Img/dove.svg';
import imgDuque from './Img/pig.svg';

const candidatesObj = [
    { name: 'Vargas', image: imgVargas, votes: 0 },
    { name: 'Fajardo', image: imgFajardo, votes: 0 },
    {name: 'Petro', image: imgPetro, votes: 0 },
    { name: 'La Calle', image: imgCalle, votes: 0 },
    { name: 'Duque', image: imgDuque, votes: 0 }
];

//const jokers = [585970, 851254, 569693, 1810, 1856, 1984];
const jokers = [85970, 51254, 69693, 1810, 1991, 2018];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      candidates: [...candidatesObj],
      jokers: jokers,
      usedJokers: [],
      giveAward: false, 
      giveName: '',  
      maxVotes: 20000000, 
      maxAmountVote: 100000,
      votesCollection: [],
      totalVotes: 0,
      alert: '',
      theEnd: false, 
      showModal: true, 
      candidateSelected: false
    }
  }

  restart = () => {
    console.log('Restarting...');
    this.setState({      
      alert: '', 
      candidates: candidatesObj, 
      usedJokers: [], 
      votesCollection: [],
      giveAward: false, 
      giveName: '', 
      totalVotes: 0, 
      jokers: jokers,       
      theEnd: false
    })
    console.log('Restarted...');   
  }

  hideAlert = () => {
    this.setState({
        alert: ''
    });
  }

  showAlert(title, message, callBack, icon) {
    this.setState({
        alert: (
            <SweetAlert 
                success
                confirmBtnText = "De acuerdo"
                confirmBtnBsStyle = "primary"
                customIcon = {icon ? icon : "thumbs-up.jpg"}
                title = {title}
                onConfirm = {this.hideAlert}
            >
                {message}
            </SweetAlert>
        )            
    });
  }

  showNotify({type, message, auto}) {
    type = type ? type : 'warning';
    let dismiss = 7;
    switch (type) {
        case 'ok':
            type = 'success';
            break;
        case 'bad':
            type = 'danger';
            if (!auto){
                dismiss = 0;
            }
            break;  
        default: 
            type  = 'warning';
    }
    const options = {
        place: "tc", 
        message: message, 
        type: type, 
        icon: "now-ui-icons ui-1_bell-53",
        autoDismiss: dismiss
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  penalize = (votes) => {
    const votesCollection = [...this.state.votesCollection];
    votesCollection.push(votes);
    let count = 0;
    votesCollection.map(vote => {      
      if (vote === votes){
        count += count;
      }
    });
    if (count === 2){
      let index = votesCollection.lastIndexOf(votes);
      if (index > 0){
        votesCollection.splice(index, 1);
      }
      index = votesCollection.lastIndexOf(votes);
      if (index > 0){      
        votesCollection.splice(index, 1);
      }
      this.setState({votesCollection});
      return true;
    }
    return false;
  }

  calculateLimit = (candidates, votes) => {
    const remaining = this.calculateRemainingVotes(this.calculateTotalVotes(candidates));
    const limit = remaining > votes * 2 ? votes * (this.penalize(votes) ? 3 : 2) : (votes > remaining) ? remaining : remaining - votes;
    return Number(limit);
  }

  isPrimeNumber = (votes) => {
    for (let i=2; i < votes / 2; i++) {
      if (votes % i === 0) {
        return false;
      }  
    }
    return true;
  }
  
  giveAward = (candidates, name) => {
    debugger;
    const names = candidates.map(cand => (cand.name));
    const del = names.indexOf(name);
    names.splice(del, 1);
    const index = Math.floor(Math.random() * names.length) + 1;
    const nameInd =  Math.floor(Math.random() * names.length) + 1;
    if (nameInd === index){
      this.setState({giveAward: true, giveName: names[index - 1]});
      return names[index - 1];
    }
  }

  generateVotos= (name, votes, remainingVotes, candidates) => {
    debugger;
    let votesToReturn = Number(votes);
    let limit = this.calculateLimit(candidates, votes);
    let breakGive = true;
    let giveName = '';
    if (!this.state.giveAward){
      giveName = this.giveAward(candidates, name);
      breakGive = false;
    }

    if (!this.state.giveAward || (this.state.giveAward && !this.isPrimeNumber(votes))){  
      for (let ind=0; ind < candidates.length; ind++){
        if (candidates[ind].name !== name && candidates[ind].name !== giveName){
          const votesToSet = Math.floor(Math.random() * limit) + 1;
          if (Number(limit) > 0){
            candidates[ind].votes += votesToSet;
            limit = this.calculateLimit(candidates, votes);            
          }
        }      
      }
    }else{   
        votesToReturn = Math.floor(Math.random() * limit) + 0;
        if (votesToReturn < votes && votes * 2 < limit){
          votesToReturn = votes * 2;
        }
        for (let ind=0; ind < candidates.length; ind++){
          if(candidates[ind].name === this.state.giveName){
            candidates[ind].votes += Math.floor(Math.random() * votesToReturn) + 0;
          }
        }
    }

    if (breakGive && this.state.giveAward){
      this.setState({giveAward: false, giveName: ''});
    }
    remainingVotes = this.calculateRemainingVotes(this.calculateTotalVotes(candidates));
    if (votesToReturn > remainingVotes){
      votesToReturn = (remainingVotes > 5) ? remainingVotes - 5 : (remainingVotes > 3) ? remainingVotes - 3 : remainingVotes > 1 ? remainingVotes - 1 : remainingVotes;
    }
    return votesToReturn;
  }

  calculateVotes = (name, votes, totalVotes, candidates) => {
    const jokers = [...this.state.jokers];    
    const usedJokers = [...this.state.usedJokers];
    const remainingVotes = this.calculateRemainingVotes(totalVotes);
    let votesToSet = Number(votes);
    const indexCandidate = candidates.findIndex(cand => cand.name === name);  
    const indexJoker = jokers.indexOf(votesToSet);
    const notExist = usedJokers.indexOf(votesToSet);

    if (indexJoker >= 0 && notExist < 0 && votesToSet !== 1){
      debugger;
      usedJokers.push(votesToSet);
      this.setState({usedJokers});
      if (votesToSet === 69693 && remainingVotes > 8000000){
        votesToSet = 7000000 + votesToSet;
      }else if (indexJoker >= 3 && remainingVotes > 200000){
        votesToSet = votesToSet * 100;          
      }else if (remainingVotes > 5000000){
        //votesToSet = 4000000 + votesToSet; 
        votesToSet = (votesToSet === 51254) ? 4800000 + votesToSet : 4500000 + votesToSet;   
      }
    }else if (votesToSet !== 1){
      votesToSet = this.generateVotos(name, votesToSet, remainingVotes, candidates);
    }
    //Se resta 3 para el remate final
    if (votesToSet + totalVotes > this.state.maxVotes){
      votesToSet = this.setState.maxVotes - totalVotes - 3;
    }
    candidates[indexCandidate].votes += votesToSet;
    this.setState({candidates});
  }

  calculateTotalVotes = (candidates) => {
    let totalVotes = 0;
    for (let k = 0; k < candidates.length; k++){
      totalVotes += candidates[k].votes;
    }
    this.setState({totalVotes: totalVotes});
    return totalVotes;
  }

  calculateRemainingVotes = (totalVotos) => {
    return this.state.maxVotes - totalVotos;
  }

  checkIfWinner = (name, candidates) => {    
    const totalVotes = this.calculateTotalVotes(candidates);
    if (Number(totalVotes) === Number(this.state.maxVotes)){
      let greater = 0;
      let winner = '';
      for (let ind = 0; ind < candidates.length; ind++){
        if (Number(candidates[ind].votes) > greater){
          greater = Number(candidates[ind].votes);
          winner = candidates[ind];
        }
      }
      this.setState({theEnd: true});
      if (winner.name === name){
        this.showNotify({type: 'ok', message: 'Ganaste!', auto: true});
        this.showAlert(`Hemos terminado, y el ganador fue tu candidato`, '¿Deseas reiniciar? Presiona F5', () => this.restart(), winner.icon);
      }else{
        this.showNotify({type: 'bad', message: 'Perdiste!', auto: true});        
        this.showAlert(`Hemos terminado, y el ganador fue ${winner.name}`, '¿Deseas reiniciar? Presiona F5', () => this.restart(), winner.icon);
      }
    }
  }
 
  whenVote = (name, votes) => {
    debugger;
    const candidates = [...this.state.candidates]; 
    if (this.state.theEnd){
      this.checkIfWinner(name, candidates);
      return;
    }     
    let totalVotes = this.calculateTotalVotes(candidates);
    if (totalVotes + Number(votes) > this.setState.maxVotes){
      this.showNotify({type: 'bad', message: '¡La cantidad máxima de votos es de 20 millones!', auto: true});
      return;
    }
    this.calculateVotes(name, votes, totalVotes, candidates);
    this.checkIfWinner(name, candidates);
  }
  
  connectToShowNotify = (type, message , auto) => {
    this.showNotify({type: type, message: message, auto: auto});
  } 

  render() {
    return (
      <div className="App">
            <Intructions />
        <NotificationAlert ref="notificationAlert"/>
        {this.state.alert}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Elecciones la Lechona</h1>
        </header>
        <div className="container-fluid">
          <div className="row " >
            <ListCandidates candidates={this.state.candidates} />
          </div>
          <div className="row " >
            <Vote candidates={this.state.candidates} vote={this.whenVote} maxVotes={this.state.maxAmountVote} showNotify={this.connectToShowNotify} />
          </div>          
          <div hidden={this.state.totalVotes === 0} className="color-total row justify-content-center" >
            <NumberFormat value={this.state.totalVotes} displayType={'text'} prefix={'  '} thousandSeparator={true} renderText={value => <h3>Total Votos:{value}</h3>} />             
          </div>
        </div>                 
      </div>
    );
  }
}

export default App;
