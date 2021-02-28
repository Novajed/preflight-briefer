import React, { useState } from 'react';
import AircodeForm from './components/aircodeForm';
import Button from './components/button';
import Results from './components/results';
import { trackPromise } from 'react-promise-tracker';
import './App.css';

const Api2Pdf = require('api2pdf');
const a2pClient = new Api2Pdf(process.env.REACT_APP_PDF_API);

function App() {
  const [finalResult, setFinalResult] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [value, setValue] = useState('');
  const [urls, setUrls] = useState([]);

  const generateDoc = () => {
    setShowResult(true);

    for (let i = 0; i < urls.length; i++) {
      trackPromise(
        a2pClient.headlessChromeFromUrl(urls[i]).then((res) => {
          setResults(...results, res.pdf);
        })
      );
    }

    a2pClient.merge(results).then((res) => {
      setFinalResult(res.pdf);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleConfirm = (url) => {
    let newUrls = [...urls, url];
    setUrls(newUrls);
  };

  return (
    <div className="App">
      <div>
        <h1>
          PREFLIGHT <span className="turn-blue">BRIEFER</span>
        </h1>
        <p>We want to make it easy for pilots to create the documents they need.</p>
        <p>Enter an ICAO airport code below and start creating your documents (Ex:"/KLAX"):</p>
      </div>

      <AircodeForm onChange={handleChange} onConfirm={handleConfirm} value={value} />

      <br />
      <Button className="button" text="Generate PDF" onClick={generateDoc} />
      <br />

      {showResult ? <Results text={'Download'} resultLink={finalResult} /> : null}
    </div>
  );
}

export default App;
