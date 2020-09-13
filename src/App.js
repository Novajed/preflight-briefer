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
      result: '',
      secondResult: '',
      allDocs: [],
      mergedDoc: '',
      showOptions: false,
      showResult: false,
      merged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.buttonWasClicked = this.buttonWasClicked.bind(this);
    this.mergeAllDocs = this.mergeAllDocs.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  showOptions() {
    this.setState((prevState) => ({ showOptions: !prevState.showOptions }));
  }

  buttonWasClicked() {
    // Transition blue/clickable when valid code is entered
    // If user clicks before valid code entered, give error saying 'please enter valid aircode'
    this.setState({ showResult: true });

    const urls = [];

    trackPromise(
      // Create PDFs, save the links as variables, pass them to merge function
      a2pClient
        .headlessChromeFromUrl(`https://www.airnav.com/airport/${this.state.value}`)
        .then((res) =>
          this.setState({ result: res.pdf, allDocs: [...this.state.allDocs, res.pdf] }, () =>
            urls.push(this.state.result)
          )
        )
    );

    trackPromise(
      // Create PDFs, save the links as variables, pass them to merge function
      a2pClient
        .headlessChromeFromUrl(
          `https://www.aviationweather.gov/metar/data?ids=${this.state.value}&format=raw&date=&hours=0&taf=on`
        )
        .then((res) =>
          this.setState({ secondResult: res.pdf, allDocs: [...this.state.allDocs, res.pdf] }, () =>
            urls.push(this.state.secondResult)
          )
        )
    );
  }

  mergeAllDocs() {
    a2pClient
      .merge(this.state.allDocs)
      .then((res) => this.setState({ mergedDoc: res.pdf }, this.setState({ merged: true })));
  }

  render() {
    const { value, result, showOptions, showResult, merged, mergedDoc } = this.state;
    return (
      <div className="App">
        <h1>
          PREFLIGHT <span className="turn-blue">BRIEFER</span>
        </h1>
        <p>We want to make it easy for pilots to create the documents they need to take to the skies.</p>
        <p>Enter an airport code below and start creating your documents:</p>

        <input className="aircode-bar" type="text" maxLength="4" value={value} onChange={this.handleChange} />

        <br />
        <button className="button" onClick={this.buttonWasClicked}>
          Generate PDF
        </button>

        <button className="button" onClick={this.showOptions}>
          Customize
        </button>

        <button className="button" onClick={this.mergeAllDocs}>
          Merge Docs
        </button>

        <br />
        {showOptions ? (
          <div className="checkbox-container">
            <input type="checkbox" name="airnav" value="Airnav" />
            <label htmlFor="airnav">AirNav</label>
            <br />
            <input type="checkbox" name="aviation" value="Aviation" />
            <label htmlFor="aviation">AviationWeather</label>
          </div>
        ) : null}
        {showResult ? <Results action={'Download'} resultLink={result} /> : null}
        {merged ? <Results action={'Download All'} resultLink={mergedDoc} /> : null}
      </div>
    );
  }
}

export default App;
