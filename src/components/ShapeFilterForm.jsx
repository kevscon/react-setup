import React from 'react';

const ShapeFilterForm = ({ formData, onInputChange, onSubmit, shapeTypes }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="type">Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={onInputChange}
        >
          <option key={0} value="">Select Type</option>
          {shapeTypes.map((option, index) => (
            <option key={index + 1} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Weight Min:
          <input
            type="number"
            name="weightMin"
            value={formData.weightMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Weight Max:
          <input
            type="number"
            name="weightMax"
            value={formData.weightMax}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Area Min:
          <input
            type="number"
            name="areaMin"
            value={formData.areaMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Area Max:
          <input
            type="number"
            name="areaMax"
            value={formData.areaMax}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Depth Min:
          <input
            type="number"
            name="depthMin"
            value={formData.depthMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Depth Max:
          <input
            type="number"
            name="depthMax"
            value={formData.depthMax}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Flange Width Min:
          <input
            type="number"
            name="flangeWidthMin"
            value={formData.flangeWidthMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Flange Width Max:
          <input
            type="number"
            name="flangeWidthMax"
            value={formData.flangeWidthMax}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Web Thickness Min:
          <input
            type="number"
            name="webThickMin"
            value={formData.webThickMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Web Thickness Max:
          <input
            type="number"
            name="webThickMax"
            value={formData.webThickMax}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Flange Thickness Min:
          <input
            type="number"
            name="flangeThickMin"
            value={formData.flangeThickMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Flange Thickness Max:
          <input
            type="number"
            name="flangeThickMax"
            value={formData.flangeThickMax}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          k<sub>des</sub> Min:
          <input
            type="number"
            name="kdesMin"
            value={formData.kdesMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
        k<sub>des</sub> Max:
          <input
            type="number"
            name="kdesMax"
            value={formData.kdesMax}
            onChange={onInputChange}
          />
        </label>
      </div> 
      <div>
        <label>
          I<sub>x</sub> Min:
          <input
            type="number"
            name="IxMin"
            value={formData.IxMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Z<sub>x</sub> Min:
          <input
            type="number"
            name="ZxMin"
            value={formData.ZxMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          S<sub>x</sub> Min:
          <input
            type="number"
            name="SxMin"
            value={formData.SxMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          r<sub>x</sub> Min:
          <input
            type="number"
            name="rxMin"
            value={formData.rxMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          I<sub>y</sub> Min:
          <input
            type="number"
            name="IyMin"
            value={formData.IyMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Z<sub>y</sub> Min:
          <input
            type="number"
            name="ZyMin"
            value={formData.ZyMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          S<sub>y</sub> Min:
          <input
            type="number"
            name="SyMin"
            value={formData.SyMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          r<sub>y</sub> Min:
          <input
            type="number"
            name="ryMin"
            value={formData.ryMin}
            onChange={onInputChange}
          />
        </label>
      </div>
      <button type="submit">Filter</button>
    </form>
  );
};

export default ShapeFilterForm;