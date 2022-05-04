import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Modal.css';
import CountdownTimer from './CountdownTimer';

class Stats extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    
        // Set the state directly. Use props if necessary.
        this.state = {
            
        }
    }

    share = () => {
        // if (navigator.share) {
        
        // } else {
        //     var text = 'Do you know who this is?\n<img src="https://pixel-people.herokuapp.com/images/characters/' + this.props.current + '.png" />';
        //     navigator.clipboard.writeText(text).then(function () {
        //         alert('Async: Copying to clipboard was successful!');
        //     }, function (err) {
        //         alert('Async: Could not copy text: ', err);
        //     });
        // }
        // fetch('/images/characters/' + this.props.current + '.png')
        fetch('https://pixel-people.herokuapp.com/images/characters/' + this.props.current + '.png')
            .then(function(response) {
                return response.blob()
            })
            .then(function(blob) {

                var file = new File([blob], "person.png", {type: 'image/png'});
                var filesArray = [file];
                var shareData = { files: filesArray };


                if (navigator.canShare && navigator.canShare(shareData)) {

                // Adding title afterwards as navigator.canShare just
                // takes files as input
                shareData.title = "Do you know who this is?"

                navigator.share(shareData)
                .then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));

                } else {
                    console.log("Your system doesn't support sharing files.");
                }
            
            });
    }
        
    componentDidMount() {
        
    }
   
    componentWillUnmount() {
    
    }

    render() {
        const TOMORROW_MIDNIGHT = new Date()
        TOMORROW_MIDNIGHT.setHours(24, 0, 0, 0)
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        let winPercentage = 0;
        if (isNaN(this.props.ppWon) && isNaN(this.props.ppPlayed)) {
            winPercentage = this.props.ppWon / this.props.ppPlayed * 100;
        }
        let lost = this.props.ppPlayed - this.props.ppWon;
        return(
            <div className={showHideClassName}>
                <section className="modal-main">
                    <div className="modal-body">
                    <FontAwesomeIcon className="close-btn" icon={faXmark} onClick={ this.props.hideModal } />
                    <h2>Statistics</h2>                    
                    <hr></hr>                    
                    <br></br>
                    <div className='columns-center results'>{ this.props.ppPlayed }</div>
                    <div className='columns-center results'>{ Math.ceil(winPercentage) }</div>
                    <div className='columns-center results'>{ this.props.ppCurrentStreak }</div>
                    <div className='columns-center results'>{ this.props.ppMaxStreak }</div>
                    <div className='columns-center'>Played<br></br><br></br></div>
                    <div className='columns-center'>Win %<br></br><br></br></div>                      
                    <div className='columns-center'>Current<br></br>Streak</div>
                    <div className='columns-center'>Max<br></br>Streak</div>                    
                    <br></br>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <span className='left-text'>Correct: <span className="results-sm">{ this.props.ppWon }</span></span><br></br>
                    <span className='left-text'>Incorrect: <span className="results-sm">{lost}</span></span><br></br>
                    <span className='left-text'>Hints Used: <span className="results-sm">{ this.props.ppHintsUsed }</span></span><br></br>
                    <div>&nbsp;</div>
                    <div className="col-55">
                        <span className="next">NEXT PIXEL PUZZLE</span>
                        <br></br>
                        <CountdownTimer targetDate={TOMORROW_MIDNIGHT} />
                    </div>
                    <div className="col-10 vl"></div>
                    <div className="col-35">
                        <button type="button" className="share-btn" onClick={this.share}>
                            SHARE
                        </button>
                    </div>
                    <br></br><br></br>
                    </div>
                    <div className="google-ads">Google Ads</div>
                    
            </section>
            
            </div> 
        )
    }
}

export default Stats;
