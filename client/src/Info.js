import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Modal.css';

class Info extends Component {
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
        const showHideClassName = this.props.showInfo ? "modal-info display-block" : "modal-info display-none";
        return(
            <div className={showHideClassName}>
                <section className="modal-main">  
                    <div className="modal-body">
                        <FontAwesomeIcon className="close-btn" icon={faXmark} onClick={ this.props.hideInfoModal } />
                        <h2>How To Play</h2>
                        <hr></hr>
                        <br></br>
                        <p className="body-text">Each day a new <b>PIXEL PUZZLE</b> will appear. If you're stuck don't forget to use your hint. To give up and see the answer click <span class="green">[?]</span> on the keyboard.
                        <br></br><br></br>
                        Use <u><b>ALL</b></u> of the spaces below the<br></br><b>PIXEL PEOPLE</b> to guess who/what it is.
                        <br></br><br></br>
                        <b>PIXEL PEOPLE</b> can be real or fictional charaters / titles from movies, bands or tv shows. Athletes, celebrities and more.
                        </p>
                        <div>&nbsp;</div>
                        <hr></hr>
                        <br></br>
                        <p className="body-text"><b>If you enjoyed this game:</b></p>
                        <br></br><br></br>
                        <button className="coffee-btn">Buy PIXEL PEOPLE a coffee!</button>
                        <br></br>
                    </div>
                    <div className="google-ads">Google Ads</div>
                </section>
            </div> 
        )
    }
}

export default Info;