import React from 'react';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {
  return (
    <div>
      <input
        className="aircode-bar"
        type="text"
        onChange={props.onChange}
        value={props.value}
        maxLength="24"
        placeholder="/KMEM"
      />
      <h3>URLs</h3>
      <div className="checkbox-container">
        {props.data.map((item, index) => (
          <div>
            <label key={item.label}>
              <input type="checkbox" />
              <input type="text" placeholder="Enter a URL" />
              {props.value}
              <input type="text" placeholder="Append a suffix" />
            </label>
          </div>
        ))}
      </div>

      {props.optionsToggled ? (
        <>
          <div className="checkbox-container">
            <input type="checkbox" name="airnav" value="Airnav" />
            <label htmlFor="airnav">AirNav</label>
            <br />
            <input type="checkbox" name="aviation" value="Aviation" />
            <label htmlFor="aviation">AviationWeather</label>
            <br />
            <input type="checkbox" name="notams" value="NOTAM" />
            <label htmlFor="notam">NOTAM</label>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AircodeForm;
