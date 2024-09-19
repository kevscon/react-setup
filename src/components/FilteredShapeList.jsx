import React from 'react';

const FilteredShapeList = ({ filteredShapes, highlightedIndex, setHighlightedIndex, onItemClick }) => {
  return (
    <ul className="list-group" style={{ width: '200px' }}>
      {filteredShapes.map((item, index) => (
        <li
          key={index}
          className={`list-group-item ${highlightedIndex === index ? 'active' : ''}`}
          onMouseEnter={() => setHighlightedIndex(index)}
          onMouseLeave={() => setHighlightedIndex(null)}
          onClick={() => onItemClick(item[0])}
        >
          {item[0]}
        </li>
      ))}
    </ul>
  );
};

export default FilteredShapeList;