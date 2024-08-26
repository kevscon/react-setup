import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './api';

// Custom hook to fetch items
const useFetchItems = (url) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(url);
        setItems(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, [url]);

  return { items, error };
};

// Custom hook to handle search logic
const useSearch = (items, searchTerm) => {
  return items.filter((item) =>
    item.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, ''))
  );
};

const SearchableList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [processedData, setProcessedData] = useState({});

  const { items } = useFetchItems(`${API_URL}/shape-labels`);
  const filteredItems = useSearch(items, searchTerm);

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowList(term.trim().length > 0);

    // Clear the table data when the search term changes
    setProcessedData({});

    if (filteredItems.includes(term.trim())) {
      handleSubmit(term.trim());
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
      <h1>Search for Steel Shape</h1>
      <input
        type="text"
        placeholder="Type shape..."
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
      <h2>Shape Properties</h2>
      <table className="table table-striped">
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
