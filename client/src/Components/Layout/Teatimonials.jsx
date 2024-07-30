import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Container} from 'react-bootstrap'
import Sidebar from '../Sidebar';
import Navbar from '../Navbr';

function Testimonials() {
  
  const [show, setShow] = useState(false);
  const [TestimonialData, setTestimonialData] = useState({
    image: null,
    name: '',
    comment: ''
  });
  const [fetchTestimonials, setFetchTestimonials] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  const handleClose = () => {
    setShow(false);
    setTestimonialData({ image: null, name: '', comment: '' });
    setEditMode(false);
    setCurrentTestimonial(null);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setTestimonialData({ ...TestimonialData, [name]: files[0] });
    } else {
      setTestimonialData({ ...TestimonialData, [name]: value });
    }
  };

  const fetchingTestimonials = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/testimonials`);
      setFetchTestimonials(response.data);
    } catch (error) {
      console.error("not fetching data", error);
    }
  };

  useEffect(() => {
    fetchingTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', TestimonialData.image);
    formData.append('name', TestimonialData.name);
    formData.append('comment', TestimonialData.comment);

    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/testimonials/${currentTestimonial}`, formData);
      } else {
        await axios.post(`http://localhost:8080/testimonials`, formData);
      }
      fetchingTestimonials();
      handleClose();
    } catch (err) {
      console.error('data failed to add', err);
      alert('data not added');
    }
  };

  const handleEdit = (testimonial) => {
    setTestimonialData({
      image: testimonial.image,
      name: testimonial.name,
      comment: testimonial.comment
    });
    setEditMode(true);
    setCurrentTestimonial(testimonial._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/testimonials/${id}`);
      fetchingTestimonials();
    } catch (err) {
      console.error('Failed to delete the testimonial', err);
    }
  };

  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
      <h1 style={{margin:'20px'}}> TESTIMONIALS</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Testimonial
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Testimonial' : 'Add Testimonial'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image (.png)</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Client's Name"
                name="name"
                value={TestimonialData.name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3}
                name="comment"
                value={TestimonialData.comment}
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

      <div className="mt-4">
        <Row xs={1} md={2} lg={4} className="g-4">
          {fetchTestimonials.map((testimonial) => (
            <Col key={testimonial._id}>
              <Card className="mb-3">
                <Card.Img variant="top" src={`http://localhost:8080/uploads/${testimonial.image}`} />
                <Card.Body>
                  <Card.Title>{testimonial.name}</Card.Title>
                  <Card.Text>{testimonial.comment}</Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(testimonial)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(testimonial._id)} className="ms-2">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      </Container>
    </>
  );
}

export default Testimonials;
