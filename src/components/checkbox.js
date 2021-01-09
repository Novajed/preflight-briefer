import React from 'react';
import './styles/aircodeForm.css';

function Checkbox(props) {
  return (
    <>
      {props.data.map((item, index) => (
        <label key={item.label}>
          <input type="checkbox" checked={item.checked || false} />
          {item.label}
          <input type="text" />
        </label>
      ))}
    </>
  );
}

export default Checkbox;
