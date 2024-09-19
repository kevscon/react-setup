import React from 'react';

const ShapeProperties = ({ shapeData, propLabels, units }) => {
  return (
    <div>
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

export default ShapeProperties;