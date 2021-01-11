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
        {props.data.map((item) => (
          <div>
            <label key={item.label}>
              Pre:
              <input type="text" placeholder="Enter a URL" />
              {props.value} Post: <input type="text" placeholder="Append a suffix" />
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
