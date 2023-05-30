
import React from 'react';

const LocationList = ({ locations, onLocationClick }) => {
  return (
    <div className="location-container">
      {locations.map((location, index) => (
        <div
          key={index}
          className="location-item"
          onClick={() => onLocationClick(location)}
        >
          {location.name}
        </div>
      ))}

     
      </div>
    
  );
};

export default LocationList;
  

  


