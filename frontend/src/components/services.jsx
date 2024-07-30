import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Services = () => {
  
  const [servicesHeadline, setServicesHeadline] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasicSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/basicsetting`);
        const data = response.data;

        // Set Services Headline and Service Description from BasicSetting data
        setServicesHeadline(data.servicesHeadline);
        setServiceDescription(data.serviceDescription);
      } catch (error) {
        console.error('Error fetching basic settings:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/services`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchBasicSettings();
    fetchServices();
  }, []);

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>{servicesHeadline || 'Our Services'}</h2>
          <p>{serviceDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.'}</p>
        </div>
        <div className="row">
          {loading ? (
            <p>Loading services...</p>
          ) : (
            services.map((service, index) => (
              <div key={index} className="col-md-4">
                {/* Assuming 'icon' and 'text' are fields in your service object */}
                {service.icon && (
                  <img src={`http://localhost:8080/uploads/${service.icon}`} alt={service.title} style={{ maxWidth: '100%' , objectFit: "contain", height:'150px ', width:'150px' }} />
                )}
                <div className="service-desc">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
