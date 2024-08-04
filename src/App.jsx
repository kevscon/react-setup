// src/App.jsx
import React from 'react';
import TextInput from './TextInput';

function App() {
  return (
    <div className="App">
      <h1>Send Text Input to Flask API</h1>
      <TextInput
        label="Enter Text:"
        placeholder="Type something..."
      />
    </div>
  );
}

export default App;
