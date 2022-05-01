import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Modal.css';

class History extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    
        // Set the state directly. Use props if necessary.
        this.state = {
            randomArray: [],
            contentBlock: ''
        }
    }
        
    componentDidMount() {
        fetch('/history')
            .then(response => response.json())
            .then(data => {
                let tempArray = data.arr;
                let newArray = []
                for (var i = 0; i < 9; i++){
                    let randItem = Math.floor(Math.random() * tempArray.length)
                    newArray.push(data.arr[randItem])
                    tempArray.splice(randItem,1)
                }
                this.setState({ randomArray: newArray }, () => {
                    let contentBlock = Array(9).fill().map((e, i) => {
                        let index = this.state.randomArray[i];
                        let block = ''
                        block = <span className="col-30 history-bg" key={i}><img src={'/images/characters/' + index + '.png'} className="" style={{ width: "70px" }} alt="Pixel Person"></img></span>
                        return block
                    })
                    this.setState({contentBlock: contentBlock})
                });
            })
        
    }
   
    componentWillUnmount() {
    
    }

    render() {
        const showHideClassName = this.props.showHistory ? "modal-history display-block" : "modal-history display-none";
        
        return(
            <div className={showHideClassName}>
                <section className="modal-main">  
                    <div className="modal-body">
                        <FontAwesomeIcon className="close-btn" icon={faXmark} onClick={ this.props.hideHistoryModal } />
                        <h2>History</h2>
                        <hr></hr>
                        <br></br>
                        <p className="body-text"><b>In Case You Missed Them!</b>
                        <br></br><b>PIXEL PEOPLE</b> from the past will appear randomly each day. 
                        <br></br><br></br>
                        {this.state.contentBlock}
                        </p>
                        <div>&nbsp;</div>
                        <hr></hr>  
                        <br></br>                     
                        <p className="body-text">Send us your suggestions and you might get featured in <b>PIXEL PEOPLE.</b></p>
                        <br></br><br></br>
                        <button className="coffee-btn">EMAIL US</button>&nbsp;
                        <button className="coffee-btn">TWITTER</button>
                        <br></br>
                    </div>
                    <div className="google-ads">Google Ads</div>
                </section>
            </div> 
        )
    }
}

export default History;