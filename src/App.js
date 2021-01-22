import React, { Component, useRef } from 'react';
// useRef allows referne to elements in HTML  
import AircodeForm from './components/aircodeForm';
import Button from './components/button';
import Results from './components/results';
import { trackPromise } from 'react-promise-tracker';
import './App.css';

const Api2Pdf = require('api2pdf');
const a2pClient = new Api2Pdf(process.env.REACT_APP_PDF_API);



class App extends Component {


  constructor(props) {
    // -----------------------
    // ??? Not sure why this is a separate function or where/how 
    // it is implemented. 
    // 
    // ----------------------- 
    super(props);

    this.state = {
  
      result: '',
      showResult: false,
      merged: false,
      mergedDoc: '',
      crashHat: '',
      crashHelmet: true,
      value: '',

      secondResult: '',
      allDocs: [],
      optionsToggled: false,
      
      data: [ { id: 1 , checked: true,  pre: "www.airnav.com/airport/", post: ""}, 
              { id: 2 , checked: true,  pre: "https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27", post: "%27&designatorForAccountable=%27%27&latDegrees=%27undefined%27&latMinutes=%270%27&latSeconds=%270%27&longDegrees=%27undefined%27&longMinutes=%270%27&longSeconds=%270%27&radius=%2710%27&sortColumns=%275%20false%27&sortDirection=%27true%27&designatorForNotamNumberSearch=%27%27&notamNumber=%27%27&radiusSearchOnDesignator=%27false%27&radiusSearchDesignator=%27%27&latitudeDirection=%27N%27&longitudeDirection=%27W%27&freeFormText=%27%27&flightPathText=%27%27&flightPathDivertAirfields=%27%27&flightPathBuffer=%274%27&flightPathIncludeNavaids=%27true%27&flightPathIncludeArtcc=%27false%27&flightPathIncludeTfr=%27true%27&flightPathIncludeRegulatory=%27false%27&flightPathResultsType=%27All%20NOTAMs%27&archiveDate=%27%27&archiveDesignator=%27%27&offset=%270%27&notamsOnly=%27true%27&filters=%27%27&minRunwayLength=%27undefined%27&minRunwayWidth=%27undefined%27&runwaySurfaceTypes=%27%27&predefinedAbraka=%27undefined%27&flightPathAddlBuffer=%27%27"}, 
              { id: 3 , checked: false,  pre: "https://www.aviationweather.gov/metar/data?ids=", post: ""}, 
            ],


    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateDoc = this.generateDoc.bind(this);
    this.mergeAllDocs = this.mergeAllDocs.bind(this);
    this.whopper = this.whopper.bind(this);

    this.crashHat = 'whopper';
  }

  render() {
    // -----------------------
    // Builds the Page
    // 
    // -----------------------    

    // bulding state variable? 
    const { result, showResult, merged, mergedDoc, crashHat, crashHelmet,value } = this.state;

    const sites = ([]);

    return (
      // Due to limits of Javascript, you can only return 1 thing... so wrap it in a <div>
      <div className="App">
        <div>
          <h1> PREFLIGHT <span className="turn-blue">BRIEFER</span>  </h1>
          <p>We want to make it easy for <b> pilots </b> to create the documents they need.</p>
          <p>Enter an ICAO airport code below and start creating your documents (Ex:"LAX"):</p>
        </div>

        <AircodeForm data={this.state.data} onChange={this.handleChange} value={value} />


        <br />

        <Button text="Generate PDF" onClick={this.generateDoc} />
        <Button text={this.crashHat} onClick={this.whopper} />
        <br />

                                  
        {showResult ? <Results text={'Download'} resultLink={result} /> : null}
        {merged ? <Results text={'Download All'} resultLink={mergedDoc} /> : null}
        {crashHelmet ? <Results text={'Crash Me'} resultLink={crashHat} /> : null}

      </div>
    );

    
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

// this.state.value = "KMEM"


    const urls = [];

    // Create PDFs, save the links as variables, pass them to merge function
    trackPromise(
      a2pClient
        .headlessChromeFromUrl(
          `${this.state.data[0].pre}${this.state.value}${this.state.data[0].post}`

        )
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
          `${this.state.data[2].pre}${this.state.value}${this.state.data[2].post}`
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


  whopper() {
    // -----------------------
    // John's function for learning js. 
    // Attached to the "whopper" button. 
    // -----------------------
    
    this.setState({ showResult: true });
    this.setState({ merged: true });
    this.setState({ crashHelmet: true });

    this.state.value = this.state.data[0].pre;
    // this.state.value = 'carl'

  }






  
}

export default App;









// OTHER CODE STORED HERE:









  // showOptions() {
  //   this.setState((prevState) => ({ showOptions: !prevState.showOptions }));
  // }