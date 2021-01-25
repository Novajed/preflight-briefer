import React, { useState } from 'react';
import InputField from './inputField';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {
  const [urls, setUrls] = useState([1, 2]);

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
      {urls.map((url) => (
        <InputField identifier={props.value} />
      ))}
      <Button text="Add" />
    </div>
  );
}

export default AircodeForm;
