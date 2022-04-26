import { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import GiveUp from './GiveUp';
 
class Keyboard extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    
        // Set the state directly. Use props if necessary.
        this.state = {
            id: 0,
            set1: null,
            set2: null,
            total: null,
            hint: null,
            specialArray: null,
            status: null,
            nextLetter: 0,
            guessArray: [],
            debugEnabled: false,
            showGiveUpModal: false,
        }
        this.giveUp = this.giveUp.bind(this)
    }
    

    handleKeyClick = event => {
        if (this.props.ppStatus !== 'null') {
            return;
        }
        let pressedKey = event.target.innerHTML;
        if (pressedKey === 'Del') {
            this.removeLetter()
        } else if (pressedKey === 'Enter') {
            if (this.state.guessArray.length === this.state.total) {
                this.checkGuess()
            } else {
                this.setState({ status: 'Incomplete' }, () => {
                    document.getElementById('status').classList.add('show')
                })
                setTimeout(() => {
                    document.getElementById('status').classList.add('fade-out')
                    setTimeout(() => this.setState({ status: null }), 1000)
                }, 2000)
            }
        } else if (pressedKey === 'Hint') {
            this.handleHintClick()
        } else if (pressedKey === 'q' && this.state.debugEnabled) {
            this.myDebug()
        } else if (pressedKey === '?') {
            this.showGiveUpModal()
        } else {
            this.insertLetter(event.target.innerHTML)
        }
    }

    insertLetter (pressedKey) {
        if (this.state.nextLetter === this.state.total) {
            return
        }
        let arr = this.state.guessArray;
        if (this.state.specialArray !== null) {
            let next_index = arr.length;
            let obj = this.state.specialArray.filter(e => parseInt(e.index) === next_index)
            if (obj.length > 0) {
                arr.push(obj[0].char);
            }
        }
        arr.push(pressedKey);
        let i = this.state.nextLetter;
        i++;
        this.setState({ guessArray: arr, nextLetter: i })
    }

    removeLetter () {
        let arr = this.state.guessArray;
        arr.pop();
        let i = this.state.nextLetter;
        i--;
        this.setState({ guessArray: arr, nextLetter: i })
    }

    checkGuess() { 
        let arr = this.state.guessArray;
        // console.log(arr.join(''));
        fetch('/guess', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess: arr.join('') })
        })
            .then(res => res.json())
            .then(res => this.setState({
                status: res.result
            }, () => {
                if (this.state.status === 'Correct') {
                    document.getElementById('status').classList.add('show')
                    this.props.setWon()
                    this.props.setCurrentStreak()
                }
                if (this.state.status === 'Wrong') {
                    document.getElementById('status').classList.add('show')
                    this.props.resetCurrentStreak()
                    this.giveUp()
                }
                this.props.setStatus(this.state.status)
                this.props.setPlayed()
                setTimeout(() => {
                    this.props.showModal()
                    document.getElementById('status').classList.add('fade-out')
                    setTimeout(() => this.setState({ status: null }), 1000)
                }, 2000)
                // console.log(this.state)
            })) 
    }

    handleHintClick() {
        this.props.setHintsUsed()
        this.props.setHintUsedToday()
        this.showHint();
    }


    showHint() {
        fetch('/hint')
            .then(response => response.json())
            .then(data => this.setState({
                hint: data.hint
            }))
    }

    myDebug () {
        fetch('/debug')
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                set1: data.set1,
                set2: data.set2,
                specialArray: data.specialArray,
                total: data.set1 + data.set2
            }, () => {
                // console.log(this.state)
            })) 
    }

    giveUp = () => {
        fetch('/giveup')
            .then(response => response.json())
            .then(data => {
                let set1 = data.set1.length;
                let set2 = data.set2 === null ? 0 : data.set2.length;
                let chars1 = data.set1
                let chars2 = data.set2
                let total = set1 + set2
                
                this.setState({
                    id: data.id,
                    set1: set1,
                    set2: set2,
                    total: total
                }, () => {
                    
                    let tempArray = []
                    for (var i = 0; i < chars1.length; i++) {
                        tempArray.push(chars1[i]);
                    }
                    if (chars2 !== null) {
                        for (var f = 0; f < chars2.length; f++) {
                            tempArray.push(chars2[f]);
                        }
                    }
                    this.setState({ guessArray: tempArray })
                })
            })
        
                
    }

    
    confirmGiveUp = () => {
        this.giveUp()
        this.hideGiveUpModal()
    }

    hideGiveUpModal = () => {
        this.setState({ showGiveUpModal: false });
    };

    showGiveUpModal = () => {
        this.setState({ showGiveUpModal: true });
    };
    
        
    componentDidMount() {
        fetch('/person')
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                set1: data.set1,
                set2: data.set2,
                specialArray: data.specialArray,
                total: data.set1 + data.set2
            }, () => {
                // console.log(this.state)
            })) 
        //    console.log(this.props.ppHintUsedToday) 
        if (this.props.ppHintUsedToday === 'true') {
            this.showHint()
        }
        
    }
   
    componentWillUnmount() {
       
    }

    render() {
        const length1 = this.state.set1;
        const t = this.state.total;
        let contentBlock = Array(t).fill().map((e, i) => { 
            let filler = this.state.guessArray[i];
            let block;
            if (this.state.specialArray !== null) {
                let obj = this.state.specialArray.filter(e => parseInt(e.index) === i)
                if (obj.length > 0) {
                    filler = obj[0].char;
                    block = <div style={{ display: "inline-block" }} className="guess-box" key={i}>{filler}</div>
                } else {
                    block = <div style={{ display: "inline-block" }} className="guess-box" key={i}>{filler}</div>
                }
            } else {
                block = <div style={{ display: "inline-block" }} className="guess-box" key={i}>{filler}</div>
            }
            return block;
        })
        if (this.state.set2) {
            contentBlock.splice(length1, 0, <div className="clearfix"></div>);
        }
        let statusClass = '';
        if (this.state.status !== null) {
            statusClass = "-" + this.state.status.toLowerCase();
        }
        
        let hintClass = '';
        if (this.state.hint !== null) {
            hintClass = "show";
        }
        return(
            <div id="Board">
                <GiveUp showGiveUp={this.state.showGiveUpModal} hideGiveUpModal={ this.hideGiveUpModal } confirmGiveUp={ this.confirmGiveUp }></GiveUp>

                <span id="status" className={"status " + (statusClass)}>{this.state.status}</span>
                <span id="help" className={"help " + (hintClass)}>{this.state.hint}</span>
                <img src={'/images/characters/' + this.state.id + '.png' } className="personImg" style={{ width: "100%", height: "auto" }} alt="Pixel Person"></img>
                
                <div id="Answer">
                    {contentBlock}
                    <div className="clearfix">&nbsp;</div>
                    
                </div>

                <div id="Letters">

                    <div id="keyboard-cont">
                        <div className="first-row">
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>q</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>w</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>e</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>r</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>t</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>y</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>u</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>i</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>o</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>p</button>
                        </div>
                        <div className="second-row">
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>a</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>s</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>d</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>f</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>g</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>h</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>j</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>k</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>l</button>
                        </div>
                        <div className="third-row">
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>z</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>x</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>c</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>v</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>b</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>n</button>
                            <button className="letter-box keyboard-button" onClick={this.handleKeyClick}>m</button>
                        </div>
                        <div className="fourth-row">
                            <button className="letter-box -lgbox keyboard-button" onClick={this.handleKeyClick}>Del</button>
                            <button className="letter-box -lgbox keyboard-button" onClick={this.handleKeyClick}>Enter</button>
                            <button className="letter-box -lgbox keyboard-button" onClick={this.handleKeyClick}>Hint</button>
                            <button className="letter-box -lgbox keyboard-button giveup" onClick={this.handleKeyClick}>?</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Keyboard;
