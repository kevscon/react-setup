import React, { useState } from 'react';
import axios from 'axios';

const TextProcessingComponent = () => {
  const [inputText, setInputText] = useState('');
  const [processedData, setProcessedData] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://kevconsulting.pythonanywhere.com/', { text: inputText });
      setProcessedData(response.data);
      setInputText('');
    } catch (error) {
      console.error('Error processing text:', error);
    }
  };

  return (
    <div>
      <h2>Text Processing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter some text:
          <input type="text" value={inputText} onChange={handleInputChange} />
        </label>
        <button type="submit">Process Text</button>
      </form>

      <h2>Processed Data</h2>
        <table>
            <tbody>

                {Object.keys(processedData).map((key) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{processedData[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table> 
    </div>
  );
};

export default TextProcessingComponent;