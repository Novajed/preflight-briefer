import React, { useState } from 'react';
import Button from './button';
import './styles/aircodeForm.css';

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
        <div>
          <label>
            Pre:
            <input type="text" onChange={handlePre} placeholder="Enter a URL" value={pre} />
            {props.identifier} Post(Optional):{' '}
            <input type="text" onChange={handlePost} placeholder="Append suffix" value={post} />
            <Button text="Confirm" />
          </label>
        </div>
      </div>
    </>
  );
}

export default InputField;
