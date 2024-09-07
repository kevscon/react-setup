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
        setError('Shape not found. Please check input.');
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, [url]);

  return { items, error };
};

const SearchableList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [shapeData, setShapeData] = useState([]);
  const [propLabels, setPropLabels] = useState([]);
  const [units, setUnits] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { items, error: fetchError } = useFetchItems(`${API_URL}/shape-labels`);

  useEffect(() => {
    if (fetchError) {
      setErrorMessage(fetchError);
    }
  }, [fetchError]);

  useEffect(() => {
    const filterItems = () => {
      if (searchTerm.trim() === '') {
        setFilteredItems([]);
        setShowList(false);
        return;
      }

      const filtered = items.filter((item) =>
        item.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, ''))
      );

      setFilteredItems(filtered);
      setShowList(filtered.length > 0);
    };

    filterItems();
  }, [items, searchTerm]);

  useEffect(() => {
    if (filteredItems.includes(searchTerm.trim())) {
      handleSubmit(searchTerm.trim());
    }
  }, [filteredItems, searchTerm]);

  const handleSearchTermChange = (e) => {
    setImageSrc('');
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    setSearchTerm(item);
    setShowList(false);
    handleSubmit(item);
  };

  const handleSubmit = async (term) => {
    try {
      const response = await axios.post(API_URL, { text: term });
      setShowList(false);
      setLoading(true);
      setShapeData(response.data.shape_props);
      setPropLabels(response.data.prop_labels);
      setUnits(response.data.units);
      setImageSrc("/img/" + response.data.shape_type + ".png");
      setLoading(false);
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      setErrorMessage('Shape data not found.');
      console.error('Error processing text:', error);
    }
  };

  return (
    <div>
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
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {imageSrc && <img src={imageSrc} style={{ marginTop: '20px', maxWidth: '35%', height: 'auto' }} />}
      {showList && (
        <ul className="list-group" style={{ width: '200px' }}>
          {filteredItems.map((item, index) => (
            <li 
              key={index} 
              className={`list-group-item ${highlightedIndex === index ? 'active' : ''}`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <h2>Shape Properties</h2>
      <table className="table table-striped" style={{ width: '20%' }}>
        <tbody>
          {shapeData.map((item, index) => (
            <tr key={index}>
              <td className="border-end" dangerouslySetInnerHTML={{ __html: propLabels[index] }} />
              <td className="text-end">{shapeData[index]}</td>
              <td className="text-start" dangerouslySetInnerHTML={{ __html: units[index] }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchableList;