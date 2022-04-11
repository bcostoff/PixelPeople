import { Component } from 'react';
import './Modal.css';

class Stats extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    
        // Set the state directly. Use props if necessary.
        this.state = {
            
        }
    }
        
    componentDidMount() {
        
    }
   
    componentWillUnmount() {
    
    }

    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        let winPercentage = this.props.ppWon / this.props.ppPlayed * 100;
        let lost = this.props.ppPlayed - this.props.ppWon;
        return(
            <div className={showHideClassName}>
                <section className="modal-main">
                    <h2>Statistics</h2>
                    <div className={'columns-center'}>Played</div>
                    <div className={'columns-center'}>Win %</div>
                    <div className={'columns-center'}>Current Streak</div>
                    <div className={'columns-center'}>Max Streak</div>
                    <div className={'columns-center'}>{ this.props.ppPlayed }</div>
                    <div className={'columns-center'}>{ Math.ceil(winPercentage) }</div>
                    <div className={'columns-center'}>{ this.props.ppCurrentStreak }</div>
                    <div className={'columns-center'}>{ this.props.ppMaxStreak }</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <span className={'left-text'}>Wins: { this.props.ppWon }</span><br></br>
                    <span className={'left-text'}>Losses: {lost}</span><br></br>
                    <span className={'left-text'}>Hints Used: { this.props.ppHintsUsed }</span><br></br>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
              <button type="button" onClick={ this.props.hideModal }>
                Close
              </button>
            </section>
            </div> 
        )
    }
}

export default Stats;
