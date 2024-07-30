import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import Navbar from '../Navbr';
import Sidebar from '../Sidebar';
import axios from 'axios';

function Features() {
  
  const [show, setShow] = useState(false);
  const [featuresData, setFeaturesData] = useState({
    icon: null,
    title: '',
    description: '',
  });
  const [features, setFeatures] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFeatureId, setCurrentFeatureId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setFeaturesData({ icon: '', title: '', description: '' });
    setEditMode(false);
    setCurrentFeatureId(null);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'icon') {
      setFeaturesData({ ...featuresData, [name]: files[0] });
    } else {
      setFeaturesData({ ...featuresData, [name]: value });
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/features`);
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('icon', featuresData.icon);
    formData.append('heading', featuresData.title);
    formData.append('paragraph', featuresData.description);

    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/features/${currentFeatureId}`, formData);
      } else {
        await axios.post(`http://localhost:8080/features`, formData);
      }
      fetchFeatures();
      handleClose();
    } catch (error) {
      console.error('Error submitting feature:', error);
    }
  };

  const handleEdit = (feature) => {
    setFeaturesData({
      icon: feature.icon,
      title: feature.heading,
      description: feature.paragraph,
    });
    setEditMode(true);
    setCurrentFeatureId(feature._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/features/${id}`);
      fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Container style={{ width: '79%', position: 'absolute', right: '50px' }}>
        <h1 style={{ margin: '20px' }}>Feature page</h1>
        <Button variant="primary" onClick={handleShow} style={{ marginLeft: '40px' }}>
          Add Feature
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Edit Feature' : 'Add Feature'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" name="icon" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formTitle" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Title"
                  name="title"
                  value={featuresData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <InputGroup className="mb-3">
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="Description"
                  name="description"
                  value={featuresData.description}
                  onChange={handleChange}
                />
              </InputGroup>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        <div className="d-flex flex-wrap m-4">
          {features.map((feature) => (
            <Card key={feature._id} className="md-14" style={{ width: '18rem', margin: '20px' }}>
              <Card.Img
                variant="top"
                src={`http://localhost:8080/uploads/${feature.icon}`}
                alt="Feature Icon"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{feature.heading}</Card.Title>
                <Card.Text>{feature.paragraph}</Card.Text>
                <Button variant="warning" onClick={() => handleEdit(feature)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDelete(feature._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Features;
