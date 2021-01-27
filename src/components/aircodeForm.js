import React, { useState, useEffect, useRef } from 'react';
import InputField from './inputField';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {
  const [urls, setUrls] = useState([
    {
      id: 0,
      isChecked: false,
    },
  ]);

  const handleAdd = (e) => {
    const newUrls = urls.slice();

    const newId = newUrls[newUrls.length - 1].id + 1;
    const newIsChecked = false;

    const obj = { id: newId, isChecked: newIsChecked };

    setUrls([...urls, obj]);
  };

  function handleRemove(url) {
    const newUrls = urls.filter((u) => u !== url);
    setUrls(newUrls);
  }

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
      {urls.map((url, index) => (
        <InputField key={index} identifier={props.value} />
      ))}
      <Button onClick={handleAdd} text="Add" />
      <Button onClick={handleRemove} text="Remove Selected" />
    </div>
  );
}

export default AircodeForm;
