import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import Sidebar from '../Sidebar';

const BasicSetting = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    aboutBanner: null,
    homeBanner: null,
    featureHeadline: '',
    aboutUsHeadline: '',
    aboutUsDescription: '',
    whyChooseUsPoints: '',
    servicesHeadline: '',
    serviceDescription: '',
    projectHeadline: '',
    projectDescription: '',
    testimonialsHeadline: '',
    teamHeading: '',
    teamDescription: '',
    contactHeading: '',
    contactDescription: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    googleMap: '',
    facebookLink: '',
    twitterLink: '',
    youtubeLink: ''
  });

  const [aboutBannerName, setAboutBannerName] = useState('');
  const [homeBannerName, setHomeBannerName] = useState('');
  
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/basicsetting`);
        const data = response.data;
        setFormData(data);
        setAboutBannerName(data.aboutBanner);
        setHomeBannerName(data.homeBanner);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
    if (type === 'file') {
      if (name === 'aboutBanner') setAboutBannerName(files[0].name);
      if (name === 'homeBanner') setHomeBannerName(files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(`http://localhost:8080/basicsetting`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form Data Submitted: ', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form!');
    }
  };

  const handleReset = () => {
    setFormData({
      websiteName: '',
      aboutBanner: null,
      homeBanner: null,
      featureHeadline: '',
      aboutUsHeadline: '',
      aboutUsDescription: '',
      whyChooseUsPoints: '',
      servicesHeadline: '',
      serviceDescription: '',
      projectHeadline: '',
      projectDescription: '',
      testimonialsHeadline: '',
      teamHeading: '',
      teamDescription: '',
      contactHeading: '',
      contactDescription: '',
      address: '',
      phone: '',
      email: '',
      whatsapp: '',
      googleMap: '',
      facebookLink: '',
      twitterLink: '',
      youtubeLink: ''
    });
    setAboutBannerName('');
    setHomeBannerName('');
  };

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
      <h1 className="text-center my-4">Website Settings Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col >
            <Form.Group controlId="formWebsiteName">
              <Form.Label>Website Name</Form.Label>
              <Form.Control
                type="text"
                name="websiteName"
                value={formData.websiteName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formHomeBanner">
              <Form.Label>Home Banner</Form.Label>
              <Form.Control
                type="file"
                name="homeBanner"
                onChange={handleChange}
               
              />
              {homeBannerName && <small className="form-text text-muted">Current file: {homeBannerName}</small>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formAboutBanner">
              <Form.Label>About Banner</Form.Label>
              <Form.Control
                type="file"
                name="aboutBanner"
                onChange={handleChange}
                
              />
             {aboutBannerName && <small className="form-text text-muted">Current file: {aboutBannerName}</small>} 
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formFeatureHeadline">
              <Form.Label>Feature Headline</Form.Label>
              <Form.Control
                type="text"
                name="featureHeadline"
                value={formData.featureHeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formAboutUsHeadline">
              <Form.Label>About Us Headline</Form.Label>
              <Form.Control
                type="text"
                name="aboutUsHeadline"
                value={formData.aboutUsHeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formAboutUsDescription">
              <Form.Label>About Us Description</Form.Label>
              <Form.Control
                as="textarea"
                name="aboutUsDescription"
                value={formData.aboutUsDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formWhyChooseUsPoints">
              <Form.Label>Why Choose Us Points</Form.Label>
              <Form.Control
                as="textarea"
                name="whyChooseUsPoints"
                value={formData.whyChooseUsPoints}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formServicesHeadline">
              <Form.Label>Services Headline</Form.Label>
              <Form.Control
                type="text"
                name="servicesHeadline"
                value={formData.servicesHeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formServiceDescription">
              <Form.Label>Service Description</Form.Label>
              <Form.Control
                as="textarea"
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formGalleryHeadline">
              <Form.Label>project Headline</Form.Label>
              <Form.Control
                type="text"
                name="projectHeadline"
                value={formData.projectHeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formGalleryDescription">
              <Form.Label>project Description</Form.Label>
              <Form.Control
                as="textarea"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formTestimonialsHeadline">
              <Form.Label>Testimonials Headline</Form.Label>
              <Form.Control
                type="text"
                name="testimonialsHeadline"
                value={formData.testimonialsHeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formTeamHeading">
              <Form.Label>Team Heading</Form.Label>
              <Form.Control
                type="text"
                name="teamHeading"
                value={formData.teamHeading}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formTeamDescription">
              <Form.Label>Team Description</Form.Label>
              <Form.Control
                as="textarea"
                name="teamDescription"
                value={formData.teamDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formContactHeading">
              <Form.Label>Contact Heading</Form.Label>
              <Form.Control
                type="text"
                name="contactHeading"
                value={formData.contactHeading}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formContactDescription">
              <Form.Label>Contact Description</Form.Label>
              <Form.Control
                as="textarea"
                name="contactDescription"
                value={formData.contactDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formWhatsapp">
              <Form.Label>Whatsapp</Form.Label>
              <Form.Control
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formGoogleMap">
              <Form.Label>Google Map</Form.Label>
              <Form.Control
                type="text"
                name="googleMap"
                value={formData.googleMap}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formFacebookLink">
              <Form.Label>Facebook Link</Form.Label>
              <Form.Control
                type="text"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formTwitterLink">
              <Form.Label>Twitter Link</Form.Label>
              <Form.Control
                type="text"
                name="twitterLink"
                value={formData.twitterLink}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formYoutubeLink">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mr-2">
          Submit
        </Button>
        <Button variant="secondary" type="reset" onClick={handleReset}>
          Reset
        </Button>
      </Form>
    </Container>
    </>
  );
};

export default BasicSetting;
