import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DictionaryTable() {
  const [dictionaryData, setDictionaryData] = useState({});

  useEffect(() => {
    const fetchDictionaryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shape-table-labels');
        setDictionaryData(response.data.A);
      } catch (error) {
        console.error('Error fetching dictionary data:', error);
      }
    };

    fetchDictionaryData();
  }, []);

  return (
    <div>
        <ul>
          {Object.keys(dictionaryData).map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
    </div>
  )
}

  export default DictionaryTable;