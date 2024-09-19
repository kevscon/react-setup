import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api/api';
import useFetchItems from '../hooks/useFetchItems';
import ShapeFilterForm from './ShapeFilterForm';
import FilteredShapeList from './FilteredShapeList';
import ShapeProperties from './ShapeProperties';

function ShapeFilter() {
  const [formData, setFormData] = useState({
    type: '',
    weightMin: '',
    weightMax: '',
    areaMin: '',
    areaMax: '',
    depthMin: '',
    depthMax: '',
    flangeWidthMin: '',
    flangeWidthMax: '',
    webThickMin: '',
    webThickMax: '',
    flangeThickMin: '',
    flangeThickMax: '',
    kdesMin: '',
    kdesMax: '',
    // k1Min: '',
    // k1Max: '',
    // TMin: '',
    // TMax: '',
    IxMin: '',
    ZxMin: '',
    SxMin: '',
    rxMin: '',
    IyMin: '',
    ZyMin: '',
    SyMin: '',
    ryMin: ''
  });
  const [filteredShapes, setFilteredShapes] = useState([]);
  const [shapeTypes, setShapeTypes] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [shapeData, setShapeData] = useState([]);
  const [propLabels, setPropLabels] = useState([]);
  const [units, setUnits] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

  const { items } = useFetchItems(`${API_URL}/shape-types`);

  useEffect(() => {
    setShapeTypes(items);
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Type: formData.type,
      W: [formData.weightMin, formData.weightMax],
      A: [formData.areaMin, formData.areaMax],
      d: [formData.depthMin, formData.depthMax],
      bf: [formData.flangeWidthMin, formData.flangeWidthMax],
      tw: [formData.webThickMin, formData.webThickMax],
      tf: [formData.flangeThickMin, formData.flangeThickMax],
      kdes: [formData.kdesMin, formData.kdesMax],
      // k1: [formData.k1Min, formData.k1Max],
      // T_toes: [formData.TMin, formData.TMax],
      Ix: [formData.IxMin, ''],
      Zx: [formData.ZxMin, ''],
      Sx: [formData.SxMin, ''],
      rx: [formData.rxMin, ''],
      Iy: [formData.IyMin, ''],
      Zy: [formData.ZyMin, ''],
      Sy: [formData.SyMin, ''],
      ry: [formData.ryMin, '']
    };

    try {
      const response = await axios.post(`${API_URL}/shape-filter`, payload);
      setFilteredShapes(response.data);
    } catch (error) {
      console.error('Error fetching filtered data', error);
    }
  };

  const handleClick = async (term) => {
    try {
      const response = await axios.post(API_URL, { text: term });
      setShapeData(response.data.shape_props);
      setPropLabels(response.data.prop_labels);
      setUnits(response.data.units);
      setImageSrc("/img/" + response.data.shape_type + ".png");
    } catch (error) {
      console.error('Error processing text:', error);
    }
  };

  return (
    <div>
      <ShapeFilterForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        shapeTypes={shapeTypes}
      />
      <FilteredShapeList
        filteredShapes={filteredShapes}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        onItemClick={handleClick}
      />
      {imageSrc && <img src={imageSrc} style={{ marginTop: '20px', maxWidth: '35%', height: 'auto' }} />}
      <ShapeProperties 
            shapeData={shapeData} 
            propLabels={propLabels} 
            units={units} 
          />
    </div>
  );
}

export default ShapeFilter;