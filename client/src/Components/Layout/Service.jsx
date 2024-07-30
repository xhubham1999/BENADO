import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Container} from 'react-bootstrap'
import Sidebar from '../Sidebar';
import Navbar from '../Navbr';
import axios from 'axios';

function Service() {


  const [show, setShow] = useState(false);
  const [ServiceData, setServiceData] = useState({
    icon: null,
    title: '',
    description: ''
  });
  const [fetchService, setFetchService] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleClose = () => {
    setShow(false);
    setServiceData({ icon: null, title: '', description: '' });
    setEditMode(false);
    setCurrentService(null);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'icon') {
      setServiceData({ ...ServiceData, [name]: files[0] });
    } else {
      setServiceData({ ...ServiceData, [name]: value });
    }
  };

  const fetchingService = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/services`);
      setFetchService(response.data);
    } catch (error) {
      console.error("not fetching data", error);
    }
  };

  useEffect(() => {
    fetchingService();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('icon', ServiceData.icon);
    formData.append('title', ServiceData.title);
    formData.append('description', ServiceData.description);

    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/services/${currentService}`, formData);
      } else {
        await axios.post(`http://localhost:8080/services`, formData);
      }
      fetchingService();
      handleClose();
    } catch (err) {
      console.error('data failed to add', err);
      alert('data not added');
    }
  };

  const handleEdit = (service) => {
    setServiceData({
      icon: service.icon,
      title: service.title,
      description: service.description
    });
    setEditMode(true);
    setCurrentService(service._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/services/${id}`);
      fetchingService();
    } catch (err) {
      console.error('Failed to delete the service', err);
    }
  };

  return (
    <>
     <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
      <h1> Service Page</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Service
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Service' : 'Add Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formIcon">
              <Form.Label>Icon (.png)</Form.Label>
              <Form.Control
                type="file"
                name="icon"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Service Title"
                name="title"
                value={ServiceData.title}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                name="description"
                value={ServiceData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
 
      <div className=" d-flex flex-wrap mt-4" >
        {fetchService.map((service) => (
          <Card key={service._id} className="m-3"style={{width:'16rem', height:'auto'}}>
            <Card.Img variant="top" src={`http://localhost:8080/uploads/${service.icon}`} style={{width:'90%', height:'200px', margin:'auto'}} />
            <Card.Body>
              <Card.Title>{service.title}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
              <Button variant="warning" onClick={() => handleEdit(service)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(service._id)} className="ms-2">
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

export default Service;
