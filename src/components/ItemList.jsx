import React from 'react';

const ItemList = ({ filteredItems, highlightedIndex, onItemClick, onMouseEnter, onMouseLeave }) => {
  return (
    <ul className="list-group" style={{ width: '200px' }}>
      {filteredItems.map((item, index) => (
        <li 
          key={index} 
          className={`list-group-item ${highlightedIndex === index ? 'active' : ''}`}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          onClick={() => onItemClick(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;