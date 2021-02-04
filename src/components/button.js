import React from 'react';
import './styles/button.css';

export default function Button(props) {
  return (
    <button type="button" className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
