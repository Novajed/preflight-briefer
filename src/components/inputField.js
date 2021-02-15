import React, { useState } from 'react';
import Button from './button';
import './styles/aircodeForm.css';
import '../App.css';

function InputField(props) {
  const [pre, setPre] = useState('');
  const [post, setPost] = useState('');

  const handlePre = (e) => {
    e.preventDefault();
    setPre(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();
    setPost(e.target.value);
  };

  return (
    <>
      <div className="checkbox-container">
        <form>
          <h4>Link {props.entryNumber}</h4>
          <br />
          <input className="float-left" type="checkbox" onChange={props.handleChecked} checked={props.checked} />
          <input type="text" onChange={handlePre} placeholder="Enter a URL" value={pre} />
          <p> {props.identifier}</p>

          <h4 className="append-text">Suffix</h4>
          <input type="text" onChange={handlePost} placeholder="(Optional) Append suffix" value={post} />
          <br />
          <Button className="confirm-btn" text="Confirm" />
          <br />
        </form>
      </div>
    </>
  );
}

export default InputField;
