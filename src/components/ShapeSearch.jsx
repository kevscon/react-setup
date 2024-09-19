import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/api';
import useFetchItems from '../hooks/useFetchItems';
import SearchInput from './SearchInput';
import ItemList from './ItemList';
import ShapeProperties from './ShapeProperties';
import ShapeFilter from './ShapeFilter';

const ShapeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [shapeData, setShapeData] = useState([]);
  const [propLabels, setPropLabels] = useState([]);
  const [units, setUnits] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showShapeFilter, setShowShapeFilter] = useState(false);

  const { items } = useFetchItems(`${API_URL}/shape-labels`);

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
    } catch (error) {
      console.error('Error processing text:', error);
    }
  };

  return (
    <div>
      {showShapeFilter ? (
        <div>
          <h2>Shape Filter</h2>
          <ShapeFilter />
          <button onClick={() => setShowShapeFilter(false)}>Back to Search</button>
        </div>
      ) : (
        <div>
          <h1>Search for Steel Shape</h1>
          <SearchInput 
            searchTerm={searchTerm} 
            onChange={handleSearchTermChange} 
            onSubmit={handleSubmit} 
          />
          <button onClick={() => setShowShapeFilter(true)}>
            Show Shape Filter
          </button>
          {loading && (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {imageSrc && <img src={imageSrc} style={{ marginTop: '20px', maxWidth: '35%', height: 'auto' }} />}
          {showList && (
            <ItemList 
              filteredItems={filteredItems} 
              highlightedIndex={highlightedIndex} 
              onItemClick={handleItemClick} 
              onMouseEnter={setHighlightedIndex} 
              onMouseLeave={() => setHighlightedIndex(null)} 
            />
          )}
          <ShapeProperties 
            shapeData={shapeData} 
            propLabels={propLabels} 
            units={units} 
          />
        </div>
      )}
    </div>
  );
};

export default ShapeSearch;