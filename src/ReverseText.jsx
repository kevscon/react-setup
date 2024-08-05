import React, { useState } from 'react';
import axios from 'axios';
// import './ReverseText.css';

const ReverseText = () => {
  const [inputText, setInputText] = useState('');
  const [reversedText, setReversedText] = useState('');

  const handleChange = async (e) => {
    const text = e.target.value;
    setInputText(text);

    try {
      const response = await axios.post('http://127.0.0.1:5000/reverse', { text });
      setReversedText(response.data.reversed_text);
    } catch (error) {
      console.error('Error reversing text:', error);
    }
  };

  return (
    <div className="reverse-text-container">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Reversed Text: {reversedText}</p>
    </div>
  );
};

export default ReverseText;
