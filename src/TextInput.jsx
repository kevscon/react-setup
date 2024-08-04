// src/TextInput.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import './TextInput.css'; // Optional: if you want to add styles

const TextInput = ({ label, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://kevconsulting.pythonanywhere.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error submitting text');
    }
  };

  return (
    <div className="text-input">
      <form onSubmit={handleSubmit}>
        {label && <label className="text-input-label">{label}</label>}
        <input
          type="text"
          className="text-input-field"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
};

export default TextInput;
