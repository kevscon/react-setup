import React, { useState } from 'react';

const RangeInput = () => {
  const [ranges, setRanges] = useState([{ min: '', max: '' }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newRanges = [...ranges];
    newRanges[index][name] = value;
    setRanges(newRanges);
  };

  const addRange = () => {
    setRanges([...ranges, { min: '', max: '' }]);
  };

  return (
    <div>
      <h2>Set Ranges</h2>
      {ranges.map((range, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="number"
            name="min"
            value={range.min}
            onChange={(e) => handleChange(index, e)}
            placeholder="Min Value"
          />
          <input
            type="number"
            name="max"
            value={range.max}
            onChange={(e) => handleChange(index, e)}
            placeholder="Max Value"
          />
        </div>
      ))}
      <button onClick={addRange}>Add Range</button>
    </div>
  );
};

export default RangeInput;