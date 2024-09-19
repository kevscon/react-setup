
import React from 'react';

const SearchInput = ({ searchTerm, onChange, onSubmit }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Type shape..."
        value={searchTerm}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(searchTerm);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;