import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Modal.css';

class GiveUp extends Component {
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
        const showHideClassName = this.props.showGiveUp ? "modal-give-up display-block" : "modal-give-up display-none";
        return(
            <div className={showHideClassName}>
                <section className="modal-main">  
                    <div className="modal-body">
                        <FontAwesomeIcon className="close-btn" icon={faXmark} onClick={ this.props.hideGiveUpModal } />
                        <h2>Are You Sure You Want To Give Up?</h2>
                        <hr></hr>
                        <br></br>
                        <button className="coffee-btn" onClick={ this.props.confirmGiveUp }>Give Up!</button>
                        <br></br>
                    </div>
                    <div className="google-ads">Google Ads</div>
                </section>
            </div> 
        )
    }
}

export default GiveUp;