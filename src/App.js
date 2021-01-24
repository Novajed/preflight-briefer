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
      merged: true,
      mergedDoc: true,
      crashHat: '',
      crashHelmet: true,
      value: '',

      secondResult: '',
      allDocs: [],
      optionsToggled: false,
      
      data: [ { id: 0 , checked: true,  pre: "https://www.airnav.com/airport/", post: "/"}, 
              { id: 1 , checked: true,  pre: "https://www.aviationweather.gov/metar/data?ids=", post: "&format=raw&date=&hours=0&taf=on"}, 
              // { id: 2 , checked: true,  pre: "https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27", post: "%27&designatorForAccountable=%27%27&latDegrees=%27undefined%27&latMinutes=%270%27&latSeconds=%270%27&longDegrees=%27undefined%27&longMinutes=%270%27&longSeconds=%270%27&radius=%2710%27&sortColumns=%275%20false%27&sortDirection=%27true%27&designatorForNotamNumberSearch=%27%27&notamNumber=%27%27&radiusSearchOnDesignator=%27false%27&radiusSearchDesignator=%27%27&latitudeDirection=%27N%27&longitudeDirection=%27W%27&freeFormText=%27%27&flightPathText=%27%27&flightPathDivertAirfields=%27%27&flightPathBuffer=%274%27&flightPathIncludeNavaids=%27true%27&flightPathIncludeArtcc=%27false%27&flightPathIncludeTfr=%27true%27&flightPathIncludeRegulatory=%27false%27&flightPathResultsType=%27All%20NOTAMs%27&archiveDate=%27%27&archiveDesignator=%27%27&offset=%270%27&notamsOnly=%27true%27&filters=%27%27&minRunwayLength=%27undefined%27&minRunwayWidth=%27undefined%27&runwaySurfaceTypes=%27%27&predefinedAbraka=%27undefined%27&flightPathAddlBuffer=%27%27"}, 

              // https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27

              { id: 2 , checked: false,  pre: "https://google.com"}, 

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

        <AircodeForm data={this.state.data} onChange={this.handleChange} checkBoxChecked={this.checkBoxChecked} value={value} />


        <br />

        <Button text="Generate PDF" onClick={this.generateDoc} />
        <Button text={this.crashHat} onClick={this.whopper} />
        <Button text="merge docs" onClick={this.mergeAllDocs} />
        <br />

                                  
        {showResult ? <Results text={'Download'} resultLink={result} /> : null}
        {merged ? <Results text={'Download All'} resultLink={mergedDoc} /> : null}

      </div>
    );

    
  }



  




  
  checkBoxChecked = (index, onChange) => {
    // const newData = [...this.state.data];
    console.log("checkbox checked")

    // const urlChecked = newData.find(urlChecked => urlChecked.key === id);
    // urlChecked.checked = !urlChecked.checked;
    // this.state.data = newData;
    const newData = [...this.state.data];


  };



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
    // functioned defined here but called by aircodeForm.js when airfield code is changed. 
    console.log("airport code changed")
    e.preventDefault();
    this.setState({ value: e.target.value });


  }









  generateDoc() {
    // -----------------------
    // Function that sends the URLs to the a2pClient. 
    // Attached to the button "generate PDF"
    // -----------------------


    this.setState({ showResult: true });
    const urls = [];

  

    // Create PDF of the coverpage.  
    // coverpage is a website on the robbinsware.com github site
    // Note this code is different as it clears out the "allDocs variable"
    trackPromise(
      a2pClient

         .headlessChromeFromUrl(`https://robbinsware.github.io/project-PFB.html`)
        // .headlessChromeFromUrl(`https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27LAS`)

         .then((res) => this.setState({ result: res.pdf, allDocs: [res.pdf] }, () => urls.push(this.state.result)
          )
        )
    );


    var i = 0;   // iterates backwards to keep them in order
     var totalURLs = this.state.data.length;
    
while (i < totalURLs) {

// *** ADD:  If statement here to inspect the checkbox. 


  if (this.state.data[i].checked===true ) {
    trackPromise(
      // Create PDFs, save the links as variables, pass them to merge function
      a2pClient
        //  .headlessChromeFromUrl(`https://www.airnav.com/airport/${this.state.aircode}`)  // Old method
        // .headlessChromeFromUrl(`https://www.yahoo.com` )        // basic test that worked
        //  .headlessChromeFromUrl(`${this.state.data[0].pre}`)   // this worked for the prevalue
          .headlessChromeFromUrl(`${this.state.data[i].pre}${this.state.value}${this.state.data[i].post}`)
        
        .then((res) =>
          this.setState({ secondResult: res.pdf, allDocs: [...this.state.allDocs, res.pdf] }, () =>
            urls.push(this.state.secondResult)
          )
        )

    );
  
  };

    
  if (this.state.data[i].checked===false ) {
    trackPromise(
      // Create PDFs, save the links as variables, pass them to merge function
      a2pClient
        //  .headlessChromeFromUrl(`https://www.airnav.com/airport/${this.state.aircode}`)  // Old method
        // .headlessChromeFromUrl(`https://www.yahoo.com` )        // basic test that worked
        //  .headlessChromeFromUrl(`${this.state.data[0].pre}`)   // this worked for the prevalue
          .headlessChromeFromUrl(`${this.state.data[i].pre}`)
        
        .then((res) =>
          this.setState({ secondResult: res.pdf, allDocs: [...this.state.allDocs, res.pdf] }, () =>
            urls.push(this.state.secondResult)
          )
        )

    );
  
  };

i =i + 1;


  };








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










  // https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27geg%27&designatorForAccountable=%27%27&latDegrees=%27undefined%27&latMinutes=%270%27&latSeconds=%270%27&longDegrees=%27undefined%27&longMinutes=%270%27&longSeconds=%270%27&radius=%2710%27&sortColumns=%276%20true%27&sortDirection=%27true%27&designatorForNotamNumberSearch=%27%27&notamNumber=%27%27&radiusSearchOnDesignator=%27false%27&radiusSearchDesignator=%27%27&latitudeDirection=%27N%27&longitudeDirection=%27W%27&freeFormText=%27%27&flightPathText=%27%27&flightPathDivertAirfields=%27%27&flightPathBuffer=%274%27&flightPathIncludeNavaids=%27true%27&flightPathIncludeArtcc=%27false%27&flightPathIncludeTfr=%27true%27&flightPathIncludeRegulatory=%27false%27&flightPathResultsType=%27All%20NOTAMs%27&archiveDate=%27%27&archiveDesignator=%27%27&offset=%270%27&notamsOnly=%27true%27&filters=%27%27&minRunwayLength=%27undefined%27&minRunwayWidth=%27un              { id: 2 , checked: true,  pre: "https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27", post: "%27&designatorForAccountable=%27%27&latDegrees=%27undefined%27&latMinutes=%270%27&latSeconds=%270%27&longDegrees=%27undefined%27&longMinutes=%270%27&longSeconds=%270%27&radius=%2710%27&sortColumns=%275%20false%27&sortDirection=%27true%27&designatorForNotamNumberSearch=%27%27&notamNumber=%27%27&radiusSearchOnDesignator=%27false%27&radiusSearchDesignator=%27%27&latitudeDirection=%27N%27&longitudeDirection=%27W%27&freeFormText=%27%27&flightPathText=%27%27&flightPathDivertAirfields=%27%27&flightPathBuffer=%274%27&flightPathIncludeNavaids=%27true%27&flightPathIncludeArtcc=%27false%27&flightPathIncludeTfr=%27true%27&flightPathIncludeRegulatory=%27false%27&flightPathResultsType=%27All%20NOTAMs%27&archiveDate=%27%27&archiveDesignator=%27%27&offset=%270%27&notamsOnly=%27true%27&filters=%27%27&minRunwayLength=%27undefined%27&minRunwayWidth=%27undefined%27&runwaySurfaceTypes=%27%27&predefinedAbraka=%27undefined%27&flightPathAddlBuffer=%27%27"}, 


  // { id: 2 , checked: true,  pre: "https://notams.aim.faa.gov/notamSearch/createNotamPdf?allNotams=true&searchType=0&designatorsForLocation=%27", post: "%27&designatorForAccountable=%27%27&latDegrees=%27undefined%27&latMinutes=%270%27&latSeconds=%270%27&longDegrees=%27undefined%27&longMinutes=%270%27&longSeconds=%270%27&radius=%2710%27&sortColumns=%275%20false%27&sortDirection=%27true%27&designatorForNotamNumberSearch=%27%27&notamNumber=%27%27&radiusSearchOnDesignator=%27false%27&radiusSearchDesignator=%27%27&latitudeDirection=%27N%27&longitudeDirection=%27W%27&freeFormText=%27%27&flightPathText=%27%27&flightPathDivertAirfields=%27%27&flightPathBuffer=%274%27&flightPathIncludeNavaids=%27true%27&flightPathIncludeArtcc=%27false%27&flightPathIncludeTfr=%27true%27&flightPathIncludeRegulatory=%27false%27&flightPathResultsType=%27All%20NOTAMs%27&archiveDate=%27%27&archiveDesignator=%27%27&offset=%270%27&notamsOnly=%27true%27&filters=%27%27&minRunwayLength=%27undefined%27&minRunwayWidth=%27undefined%27&runwaySurfaceTypes=%27%27&predefinedAbraka=%27undefined%27&flightPathAddlBuffer=%27%27"}, 
