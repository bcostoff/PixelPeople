import React, { Component } from "react";
import './App.css';
import Keyboard from './Keyboard';
import Stats from './Stats';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      ppPlayed: 0,
      ppWon: 0,
      ppCurrentStreak: 0,
      ppMaxStreak: 0,
      ppHintsUsed: 0
    };
    // this.showModal = this.showModal.bind(this);
    // this.hideModal = this.hideModal.bind(this);
    // localStorage.setItem('myCat', 'Tom');
    // localStorage.removeItem('myCat');

    if("ppPlayed" in localStorage){
      this.setState({
        ppPlayed: localStorage.getItem('ppPlayed')
      })
    }else{
      localStorage.setItem('ppPlayed', '')
    }

    if("ppWon" in localStorage){
      this.setState({
        ppWon: localStorage.getItem('ppWon')
      })
    }else{
      localStorage.setItem('ppWon', '')
    }

    if("ppCurrentStreak" in localStorage){
      this.setState({
        ppCurrentStreak: localStorage.getItem('ppCurrentStreak')
      })
    }else{
      localStorage.setItem('ppCurrentStreak', '')
    }

    if("ppMaxStreak" in localStorage){
      this.setState({
        ppMaxStreak: localStorage.getItem('ppMaxStreak')
      })
    }else{
      localStorage.setItem('ppMaxStreak', '')
    }

    if("ppHintsUsed" in localStorage){
      this.setState({
        ppHintsUsed: localStorage.getItem('ppHintsUsed')
      })
    }else{
      localStorage.setItem('ppHintsUsed', '')
    }
  }

  setPlayed = () => {
    let played = this.state.ppPlayed
    played++;
    localStorage.setItem('ppPlayed', played)
    this.setState({ ppPlayed: played });
  };

  setWon = () => {
    let won = this.state.ppWon
    won++;
    localStorage.setItem('ppWon', won)
    this.setState({ ppWon: won });
  };

  setCurrentStreak = () => {
    let currentStreak = this.state.ppCurrentStreak
    currentStreak++;
    localStorage.setItem('ppCurrentStreak', currentStreak)
    this.setState({ ppCurrentStreak: currentStreak }, () => {
      if (this.state.ppCurrentStreak > this.state.ppMaxStreak) {
        localStorage.setItem('ppMaxStreak', currentStreak)
        this.setState({ ppMaxStreak: currentStreak });
      }
    });
  };

  resetCurrentStreak = () => {
    localStorage.setItem('ppCurrentStreak', 0)
    this.setState({ ppCurrentStreak: 0 });
  };

  setHintsUsed = () => {
    let hintsUsed = this.state.ppHintsUsed
    hintsUsed++;
    localStorage.setItem('ppHintsUsed', hintsUsed)
    this.setState({ ppHintsUsed: hintsUsed });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  handleStatsClick = event => {
    this.showModal();
  }

  render() {
    return (
      <div className={"App"}>
        <button onClick={this.handleStatsClick}><i className={"fa-solid fa-chart-bar"}></i></button>
        <header className={"App-header"}>Pixel People</header>
        <Stats show={this.state.showModal} hideModal={ this.hideModal } ppPlayed={this.state.ppPlayed} ppWon={this.state.ppWon} ppCurrentStreak={this.state.ppCurrentStreak} ppMaxStreak={this.state.ppMaxStreak} ppHintsUsed={this.state.ppHintsUsed}></Stats>
        <Keyboard showModal={ this.showModal } setPlayed={ this.setPlayed } setWon={ this.setWon } setCurrentStreak={ this.setCurrentStreak } setHintsUsed={ this.setHintsUsed } resetCurrentStreak={ this.resetCurrentStreak }></Keyboard>
      </div>
    );
  }
}

export default App;
