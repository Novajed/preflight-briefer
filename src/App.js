import React, { Component } from 'react';
import './App.css';
import Results from './results';
import { trackPromise } from 'react-promise-tracker';



const Api2Pdf = require('api2pdf');
const a2pClient = new Api2Pdf(process.env.REACT_APP_PDF_API);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      siteA: 'aaa',
      isValid: false,
      result: '',
      showResult: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.siteAchange = this.siteAchange.bind(this);
    this.buttonWasClicked = this.buttonWasClicked.bind(this);
    this.otherButtonClicked = this.otherButtonClicked.bind(this);


  }




  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  siteAchange(event) {
    event.preventDefault();
    this.setState({ siteA: event.target.siteA });
  }
  



  buttonWasClicked() {
    // Transition blue/clickable when valid code is entered
    // If user clicks before valid code entered, give error saying 'please enter valid aircode'
    this.setState({ showResult: true });

    trackPromise(
      a2pClient
        .headlessChromeFromUrl(`https://www.airnav.com/airport/${this.state.value}`)
        .then((res) => this.setState({ result: res.pdf }))
    );
  }



  
  otherButtonClicked() {
    const { value, siteA, result, showResult } = this.state;


    this.setState({ showResult: false });


    var x = 10;

    // draw the car body

    // siteA.value = value.value
    // this.setState({ siteA: event.target.siteA });
    // this.setState({ siteA: this.target.value });
    // siteA.value = 'a'
// trying learn some of this I wanted to make a button that just moved the value from one entry box to the next. 

this.draw()


  }

 draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    context.fillRect(20,20,100,100);
    context.clearRect(40,40,60,60);
    context.strokeRect(45,45,50,50);
  }
}

  



  render() {
    const { value, siteA, result, showResult } = this.state;

    return (
      <div className="App">
        <h1>
          PREFLIGHT <span className="turn-blue">BRIEFER</span>
        </h1>
        <p>We want to make it easy for pilots to create the documents they need to take to the skies.</p>
        <p>Enter an airport code below and start creating your documents:</p>

        <input className="code-bar" type="text" maxLength="4" value={value} onChange={this.handleChange} />

        <input className="code-bar" type="text" maxLength="40" siteA={siteA} onChange={this.siteAchange} />

        <br />
        <button className="button" onClick={this.buttonWasClicked}>
          Generate PDF
        </button>
        <br />


        <br />
        <button className="button" onClick={this.otherButtonClicked}>
          Load Site A
        </button>
        <br />

        {showResult ? <Results resultLink={result} /> : null}
      </div>
    );
  }
}

export default App;
