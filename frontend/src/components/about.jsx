import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const About = () => {
  const [aboutData, setAboutData] = useState({
    aboutBanner: '',
    aboutUsHeadline: '',
    aboutUsDescription: '',
    whyChooseUsPoints: [],
  });

  // Use useCallback to memoize the function if it's a dependency
  const fetchAboutData = useCallback(async () => {
    try {
      console.log('Fetching about data...');
      const response = await axios.get('http://localhost:8080/basicsetting');
      const data = response.data;
      console.log('Data fetched successfully:', data);

      setAboutData({
        aboutBanner: data.aboutBanner || '',
        aboutUsHeadline: data.aboutUsHeadline || 'About Us',
        aboutUsDescription: data.aboutUsDescription || 'Loading...',
        whyChooseUsPoints: data.whyChooseUsPoints || [],
      });
    } catch (error) {
      console.error('Error fetching about data:', error.response ? error.response.data : error.message);
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]); // Include fetchAboutData in the dependency array

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img 
              src={`http://localhost:8080/uploads/${aboutData.aboutBanner}`} 
              className="img-responsive" 
              alt="About Banner" 
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{aboutData.aboutUsHeadline}</h2>
              <p style={{fontSize:'20px'}}>{aboutData.aboutUsDescription}</p>
              <h3 style={{marginTop:'50px'}}>Why Choose Us?</h3>
              <div className="list-style" style={{fontSize:'20px'}}>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {aboutData.whyChooseUsPoints.slice(0, Math.ceil(aboutData.whyChooseUsPoints.length / 2)).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {aboutData.whyChooseUsPoints.slice(Math.ceil(aboutData.whyChooseUsPoints.length / 2)).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
