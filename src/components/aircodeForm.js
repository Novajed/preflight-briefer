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
      <h3>Build Links</h3>

      {urls.map((url, index) => (
        <InputField
          key={url.id}
          identifier={props.value}
          checked={url.isChecked}
          handleChecked={handleChecked(index)}
        />
      ))}
      <Button onClick={handleAdd} text="Add" />
      <Button onClick={handleRemove} text="Remove Selected" />
    </div>
  );
}

export default AircodeForm;
