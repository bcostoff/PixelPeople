import React, { Component } from "react"
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import Keyboard from './Keyboard'
import Stats from './Stats'
import Info from './Info'
import Canvas from './Canvas'

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showInfoModal: false,
      ppPlayed: 0,
      ppWon: 0,
      ppCurrentStreak: 0,
      ppMaxStreak: 0,
      ppHintsUsed: 0,
      ppDate: null,
      ppStatus: null,
      ppHintUsedToday: false
    };
    // this.showModal = this.showModal.bind(this);
    // this.hideModal = this.hideModal.bind(this);
    // localStorage.setItem('myCat', 'Tom');
    // localStorage.removeItem('myCat');
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    let curDate = mm + '-' + dd + '-' + yyyy

    if("ppStatus" in localStorage){
      this.state.ppStatus = localStorage.getItem('ppStatus')
    }else{
      localStorage.setItem('ppStatus', null)
    }

    if("ppPlayed" in localStorage){
      this.state.ppPlayed = localStorage.getItem('ppPlayed')
    }else{
      localStorage.setItem('ppPlayed', '')
    }

    if("ppWon" in localStorage){
      this.state.ppWon = localStorage.getItem('ppWon')
    }else{
      localStorage.setItem('ppWon', '')
    }

    if("ppCurrentStreak" in localStorage){
      this.state.ppCurrentStreak = localStorage.getItem('ppCurrentStreak')
    }else{
      localStorage.setItem('ppCurrentStreak', '')
    }

    if("ppMaxStreak" in localStorage){
      this.state.ppMaxStreak = localStorage.getItem('ppMaxStreak')
    }else{
      localStorage.setItem('ppMaxStreak', '')
    }

    if("ppHintsUsed" in localStorage){
      this.state.ppHintsUsed = localStorage.getItem('ppHintsUsed')
    }else{
      localStorage.setItem('ppHintsUsed', '')
    }

    if ("ppDate" in localStorage) {
      this.state.ppDate = localStorage.getItem('ppDate')
      if (this.state.ppDate !== curDate) {
        localStorage.setItem('ppDate', curDate)
        localStorage.setItem('ppStatus', null)
        window.location.reload()
      }
    } else {
      localStorage.setItem('ppDate', curDate)
    }

    if ("ppHintUsedToday" in localStorage) {
      if (localStorage.getItem('ppDate') === curDate) {
        this.state.ppHintUsedToday = localStorage.getItem('ppHintUsedToday')
      } else {
        localStorage.setItem('ppHintUsedToday', false)
      }
    }else{
      localStorage.setItem('ppHintUsedToday', false)
    } 
    
  }

  componentDidMount() {

    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth()+1; 
    // let yyyy = today.getFullYear();
    // let curDate = mm + '-' + dd + '-' + yyyy

    // if("ppDate" in localStorage){
    //   this.setState({
    //     ppDate: localStorage.getItem('ppDate')
    //   }, () => {
    //     if (this.state.ppDate !== curDate) {
    //       localStorage.setItem('ppDate', curDate)
    //       localStorage.setItem('ppStatus', null)
    //       window.location.reload()
    //     }

    //     if ("ppHintUsedToday" in localStorage) {
    //       if (localStorage.getItem('ppDate') === curDate) {
    //         this.setState({
    //           ppHintUsedToday: localStorage.getItem('ppHintUsedToday')
    //         })
    //       } else {
    //         localStorage.setItem('ppHintUsedToday', false)
    //       }
    //     }else{
    //       localStorage.setItem('ppHintUsedToday', false)
    //     }
    //   })
    // }else{
    //   localStorage.setItem('ppDate', curDate)
    // }
    
  }

  setStatus = (status) => {
    localStorage.setItem('ppStatus', status)
    this.setState({ ppStatus: status });
  };

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

  setHintUsedToday = () => {
    localStorage.setItem('ppHintUsedToday', true)
    this.setState({ ppHintUsedToday: true });
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

  handleInfoClick = event => {
    this.showInfoModal();
  }

  hideInfoModal = () => {
    this.setState({ showInfoModal: false });
  };

  showInfoModal = () => {
    this.setState({ showInfoModal: true });
  };

  render() {
    return (
      <div className="App">        
        <header className="App-header">
        <span className="col-10">
          <FontAwesomeIcon className="info" icon={faCircleQuestion} onClick={this.handleInfoClick} />
          <FontAwesomeIcon className="history" icon={faUserAstronaut} onClick={this.handleInfoClick} />
        </span>         
        <span className="col-80">PIXEL PEOPLE</span>
        <span className="col-10"><FontAwesomeIcon className="stats" icon={faChartSimple} onClick={this.handleStatsClick} /></span>
        </header>
        <Stats show={this.state.showModal} hideModal={this.hideModal} ppPlayed={this.state.ppPlayed} ppWon={this.state.ppWon} ppCurrentStreak={this.state.ppCurrentStreak} ppMaxStreak={this.state.ppMaxStreak} ppHintsUsed={this.state.ppHintsUsed}></Stats>
        <Info showInfo={this.state.showInfoModal} hideInfoModal={this.hideInfoModal}></Info>
        {/* <Canvas /> */}
        <Keyboard
          showModal={this.showModal}
          setPlayed={this.setPlayed}
          setWon={this.setWon}
          setCurrentStreak={this.setCurrentStreak}
          setHintsUsed={this.setHintsUsed}
          ppHintUsedToday={this.state.ppHintUsedToday}
          setHintUsedToday={this.setHintUsedToday}
          resetCurrentStreak={this.resetCurrentStreak}
          setStatus={this.setStatus}
          ppStatus={this.state.ppStatus} ></Keyboard> 
      </div>
    );
  }
}

export default App;