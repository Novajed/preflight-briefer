import React, { useState } from 'react';
import Button from './button';
import './styles/aircodeForm.css';
import '../App.css';

function InputField(props) {
  const [pre, setPre] = useState('');
  const [post, setPost] = useState('');
  const [link, setLink] = useState('');

  const handlePre = (e) => {
    e.preventDefault();
    setPre(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();
    setPost(e.target.value);
  };

  const handleConfirm = () => {
    let url = pre + props.identifier + post;
    setLink(url);
    console.log(link);
    props.onConfirm(url);
    return link;
  };

  return (
    <>
      <div className="checkbox-container">
        <form>
          <h4>Link {props.entryNumber}</h4>
          <input className="float-left" type="checkbox" onChange={props.onChecked} checked={props.checked} />
          <span className="mobile-container">
            <input type="text" onChange={handlePre} placeholder="Enter a URL" value={pre} />
            <p className="id-desktop"> {props.identifier} </p>
            <input type="text" onChange={handlePost} placeholder="(Optional) Append suffix" value={post} />
          </span>
          <br />
        </form>
        <Button className="confirm-btn" onClick={handleConfirm} text="Confirm" />
      </div>
    </>
  );
}

export default InputField;
