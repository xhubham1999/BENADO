import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Features = () => {
  
  const [features, setFeatures] = useState([]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/features`);
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []); // Add backendURL to the dependency array

  return (
    <div id="features" className="text-center" style={{ margin: '20px' }}>
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {features.length > 0
            ? features.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-4" style={{ marginBottom: '30px' }}>
                  <img
                    src={`http://localhost:8080/uploads/${d.icon}`}
                    alt="Feature Icon"
                    style={{ height: '150px', width: '150px', objectFit: 'contain' }}
                  />
                  <h3>{d.heading}</h3>
                  <p>{d.paragraph}</p>
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};
