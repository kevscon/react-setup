import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './api';

const SearchableList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL + '/shape-labels');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, ''))
  );

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setShowList(e.target.value.trim().length > 0);

    if (filteredItems.includes(e.target.value.trim())) {
      handleSubmit(e.target.value.trim());
    }
  };

  const handleItemClick = (item) => {
    setSearchTerm(item);
    setShowList(false);
    handleSubmit(item);
  };

  const handleSubmit = async (term) => {
    try {
      const response = await axios.post(API_URL, { text: term });
      setProcessedData(response.data);
    } catch (error) {
      console.error('Error processing text:', error);
    }
  };

  return (
    <div>
      <h1>Searchable List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(searchTerm);
          }
        }}
      />
      {showList && (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
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

export default SearchableList;