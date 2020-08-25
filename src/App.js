import React, { Component } from 'react';
import './App.css';

const pdfshift = require('pdfshift')(process.env.REACT_APP_PDF_KEY);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonWasClicked = this.buttonWasClicked.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  buttonWasClicked() {
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
        <h1>PREFLIGHT BRIEFER</h1>
        <form>
          <label>
            Variable Input:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
        <br />
        <button onClick={this.buttonWasClicked}>Generate PDF</button>
      </div>
    );
  }
}

export default App;
