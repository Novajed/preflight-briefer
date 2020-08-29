import React, { Component } from 'react';
import './App.css';
import firebase from './util/firebase';

const pdfshift = require('pdfshift')(process.env.REACT_APP_PDF_KEY);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isValid: false,
      errors: {
        aircode: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonWasClicked = this.buttonWasClicked.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  buttonWasClicked() {
    // Transition blue/clickable when valid code is entered
    // If user clicks before valid code entered, give error saying 'please enter valid aircode'
    pdfshift
      .convert(`https://www.airnav.com/airport/${this.state.value}`, { filename: 'result.pdf' })
      .then(function (body) {
        console.log(body);
      })
      .catch(function ({ message, code, response, errors = null }) {
        console.log(message);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>
          PREFLIGHT <span className="turn-blue">BRIEFER</span>
        </h1>
        <p>We want to make it easy for pilots to create the documents they need to take to the skies.</p>
        <p>Enter an airport code below and start creating your documents:</p>

        <input className="code-bar" type="text" maxLength="4" value={this.state.value} onChange={this.handleChange} />

        <br />
        <button className="button" onClick={this.buttonWasClicked}>
          Generate PDF
        </button>
      </div>
    );
  }
}

export default App;
