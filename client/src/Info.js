import { Component } from 'react';
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
                    <h2>Info</h2>
                    <hr></hr>
                    <br></br>
                    <p>Info goes here.</p>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
              <button type="button" className="close-btn" onClick={ this.props.hideInfoModal }>
                Close
              </button>
            </section>
            </div> 
        )
    }
}

export default Info;
