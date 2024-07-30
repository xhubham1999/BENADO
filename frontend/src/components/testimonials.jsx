import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Testimonials = () => {
  
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsHeadline, setTestimonialsHeadline] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsResponse = await axios.get(`http://localhost:8080/testimonials`);
        const basicSettingsResponse = await axios.get(`http://localhost:8080/basicsetting`);

        setTestimonials(testimonialsResponse.data);
        setTestimonialsHeadline(basicSettingsResponse.data.testimonialsHeadline);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>{testimonialsHeadline || 'What our clients say'}</h2>
        </div>
        <div className="row">
          {loading ? (
            <p>Loading testimonials...</p>
          ) : (
            testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <div className="testimonial">
                  <div className="testimonial-image">
                    <img src={`http://localhost:8080/uploads/${testimonial.image}`} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-content">
                    <p>"{testimonial.comment}"</p>
                    <div className="testimonial-meta"> - {testimonial.name} </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
