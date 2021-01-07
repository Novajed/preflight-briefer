import React from 'react';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {
  return (
    <div>
      <input className="aircode-bar" type="text" onChange={props.onChange} value={props.value} maxLength="4" />
      <br />
      <Button text="Customize" onClick={props.toggleOptions} />

      {props.optionsToggled ? (
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
      ) : null}
    </div>
  );
}

export default AircodeForm;
