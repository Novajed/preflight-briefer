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
        placeholder="/KLAX"
      />
      <h3>Build Links</h3>
      <div className="checkbox-container">
        {props.data.map((item, index) => (
          <div key={index}>
            <label>
              Pre:
              <input type="text" onChange={props.onPreChange} placeholder="Enter a URL" value={props.pre} />
              {props.value} Post(Optional):{' '}
              <input type="text" onChange={props.onPostChange} placeholder="Append suffix" value={props.post} />
              <Button text="Confirm" />
            </label>
          </div>
        ))}
      </div>
      <Button text="Add" onClick={props.addLine} />
    </div>
  );
}

export default AircodeForm;
