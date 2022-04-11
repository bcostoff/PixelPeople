import { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';

class Keyboard extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    
        // Set the state directly. Use props if necessary.
        this.state = {
            id: null,
            set1: null,
            set2: null,
            total: null,
            hint: null,
            status: null,
            nextLetter: 0,
            guessArray: []
        }
    }

    handleKeyClick = event => {
        let pressedKey = event.target.innerHTML;
        if (pressedKey === 'Del') {
            this.removeLetter()
        } else if (pressedKey === 'Enter') {
            this.checkGuess()
        } else if (pressedKey === 'Hint') {
            this.showHint()
        } else {
            this.insertLetter(event.target.innerHTML)
        }
    }

    insertLetter (pressedKey) {
        if (this.state.nextLetter === this.state.total) {
            return
        }
        let arr = this.state.guessArray;
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
                if (this.state.status === 'correct') {
                    this.props.setWon()
                    this.props.setCurrentStreak()
                }
                if (this.state.status === 'wrong') {
                    this.props.resetCurrentStreak()
                }
                this.props.setPlayed()
                setTimeout(() => this.props.showModal(), 2000)
                // console.log(this.state)
            })) 
    }

    showHint () {
        fetch('/hint')
            .then(response => response.json())
            .then(data => this.setState({
                hint: data.hint
            }, () => {
                this.props.setHintsUsed()
                // console.log(this.state)
            })) 
    }
        
    componentDidMount() {
        fetch('/person')
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                set1: data.set1,
                set2: data.set2,
                total: data.set1 + data.set2
            }, () => {
                // console.log(this.state)
            })) 
    }
   
    componentWillUnmount() {
    
    }

    render() {
        const length1 = this.state.set1;
        const t = this.state.total;
        let contentBlock = Array(t).fill().map((e, i) => { 
            let block = <div style={{ display: "inline-block" }}><button>{this.state.guessArray[i]}</button></div>
            return block;
        })
        if (this.state.set2) {
            contentBlock.splice(length1, 0, <div class="clearfix"></div>);
        }
        return(
            <div id="Board">

                <span class="status">{this.state.status}</span>
                <span class="help">{this.state.hint}</span>
                <img src={'/images/characters/' + this.state.id + '.png' } class="wow fadeIn img-responsive center-block" style={{ width: "100%", height: "auto" }} alt="Pixel Person"></img>
                
                <div id="Answer">
                    {contentBlock}
                    <div class="clearfix">&nbsp;</div>
                    
                </div>

                <div id="Letters">

                    <div id="keyboard-cont">
                        <div class="first-row">
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>q</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>w</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>e</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>r</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>t</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>y</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>u</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>i</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>o</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>p</button>
                        </div>
                        <div class="second-row">
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>a</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>s</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>d</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>f</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>g</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>h</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>j</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>k</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>l</button>
                        </div>
                        <div class="third-row">
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>z</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>x</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>c</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>v</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>b</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>n</button>
                            <button class="letter-box keyboard-button" onClick={this.handleKeyClick}>m</button>
                        </div>
                        <div class="fourth-row">
                            <button class="letter-box -lgbox keyboard-button" onClick={this.handleKeyClick}>Del</button>
                            <button class="letter-box -lgbox keyboard-button" onClick={this.handleKeyClick}>Enter</button>
                            <button class="letter-box -lgbox keyboard-button" onClick={this.handleKeyClick}>Hint</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Keyboard;
