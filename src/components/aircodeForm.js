import React, { useState } from 'react';
import InputField from './inputField';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {
  const [urls, setUrls] = useState([
    {
      id: 1,
      isChecked: false,
    },
  ]);

  const defaultUrl = [
    {
      id: 1,
      isChecked: false,
    },
  ];

  const resetUrls = () => {
    setUrls([...defaultUrl]);
  };

  const handleAdd = () => {
    console.log(urls);
    if (urls.length < 1) {
      resetUrls();
    } else {
      const newUrls = urls.slice();
      const newId = newUrls[newUrls.length - 1].id + 1;
      const newIsChecked = false;
      const obj = { id: newId, isChecked: newIsChecked };
      setUrls([...urls, obj]);
    }
  };

  const handleRemove = (url) => {
    const newUrls = urls.filter((u) => u.isChecked !== true);
    setUrls(newUrls);
  };

  const handleChecked = (index) => {
    return () => {
      let newUrls = [...urls];
      newUrls[index].isChecked = !newUrls[index].isChecked;
      setUrls(newUrls);
    };
  };

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
      <h3>URLs</h3>

      {urls.map((url, index) => (
        <InputField
          key={url.id}
          checked={url.isChecked}
          entryNumber={url.id}
          identifier={props.value}
          onChecked={handleChecked(index)}
          onConfirm={props.onConfirm}
        />
      ))}
      <Button onClick={handleAdd} className="button" text="New Link" />
      <Button onClick={handleRemove} className="button" text="Remove Selected" />
    </div>
  );
}

export default AircodeForm;
