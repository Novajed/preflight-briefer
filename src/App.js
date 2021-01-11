import React, { Component } from 'react';
import AircodeForm from './components/aircodeForm';
import Button from './components/button';
import Results from './components/results';
import { trackPromise } from 'react-promise-tracker';
import './App.css';

const Api2Pdf = require('api2pdf');
const a2pClient = new Api2Pdf(process.env.REACT_APP_PDF_API);



class App extends Component {

  render() {
    // -----------------------
    // Builds the Page
    // 
    // -----------------------    
    const { result, showResult, merged, mergedDoc, crashHat, crashHelmet,value } = this.state;

    return (
      <div className="App">
        <div>
          <h1> PREFLIGHT <span className="turn-blue">BRIEFER</span>  </h1>
          <p>We want to make it easy for pilots to create the documents they need.</p>
          <p>Enter an ICAO airport code below and start creating your documents (Ex:"LAX"):</p>
        </div>

        <AircodeForm data={this.state.data} onChange={this.handleChange} value={value} />

        <br />

        <Button text="Generate PDF" onClick={this.generateDoc} />
        <Button text="Crasher" onClick={this.crashed} />
        <br />


        {showResult ? <Results text={'Download'} resultLink={result} /> : null}
        {merged ? <Results text={'Download All'} resultLink={mergedDoc} /> : null}
        {crashHelmet ? <Results text={'Crash Me'} resultLink={crashHat} /> : null}

      </div>
    );
  }



  constructor(props) {
    // -----------------------
    // Controls functionality and properties of the page.
    // 
    // ----------------------- 
    super(props);

    this.state = {
      value: '',
      optionsToggled: false,
      result: '',
      secondResult: '',
      allDocs: [],
      mergedDoc: '',
      showResult: false,
      crashHelmet: true,
      merged: false,
      data: [{ label: 'item 1' }, { label: 'item 2' }, { label: 'item 3' }],
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateDoc = this.generateDoc.bind(this);
    this.mergeAllDocs = this.mergeAllDocs.bind(this);
    this.crashed = this.crashed.bind(this);


  }




  




  toggle = (index, onChange) => {
    const newData = [...this.state.data];
    newData.splice(index, 1, {
      label: this.state.data[index].label,
      checked: !this.state.data[index].checked,
    });

    this.setState({ data: newData });
    onChange(newData.filter((x) => x.checked));
  };



  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }









  generateDoc() {
    // -----------------------
    // Function that sends the URLs to the a2pClient. 
    // Attached to the button
    // -----------------------

    // Turns on the download button for the results. 
    this.setState({ showResult: true });




    const urls = [];

    // Create PDFs, save the links as variables, pass them to merge function
    trackPromise(
      a2pClient
        .headlessChromeFromUrl(`https://google.com`)
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
    // -----------------------
    // Funtion that merges the results. 
    // -----------------------

    trackPromise(
      a2pClient
        .merge(this.state.allDocs)
        .then((res) => this.setState({ mergedDoc: res.pdf }, this.setState({ merged: true })))
    );
  }


  crashed() {
    // -----------------------
    // John's function for learning js. 
    // Attached to the "Crash It" button. 
    // -----------------------
    
    this.setState({ showResult: true });
    this.setState({ merged: true });
    this.setState({ crashHelmet: true });

    this.crashHelmet.setState({ text: "rash Me"})




  }






  
}

export default App;









// OTHER CODE STORED HERE:









  // showOptions() {
  //   this.setState((prevState) => ({ showOptions: !prevState.showOptions }));
  // }