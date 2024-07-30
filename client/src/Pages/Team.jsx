import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Container} from 'react-bootstrap'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbr';


function Team() {

  
  const [show, setShow] = useState(false);
  const [teamMemberData, setTeamMemberData] = useState({
    image: null,
    name: '',
    post: '',
    whatsappNumber: '',
    email: '',
    mobileNumber: ''
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState(null);

  const handleClose = () => {
    setShow(false);
    setTeamMemberData({
      image: null,
      name: '',
      post: '',
      whatsappNumber: '',
      email: '',
      mobileNumber: ''
    });
    setEditMode(false);
    setCurrentTeamMember(null);
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setTeamMemberData({ ...teamMemberData, [name]: files[0] });
    } else {
      setTeamMemberData({ ...teamMemberData, [name]: value });
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/team`);
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch team members', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', teamMemberData.image);
    formData.append('name', teamMemberData.name);
    formData.append('post', teamMemberData.post);
    formData.append('whatsapp', teamMemberData.whatsappNumber);
    formData.append('email', teamMemberData.email);
    formData.append('mobile', teamMemberData.mobileNumber);

    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/team/${currentTeamMember}`, formData);
      } else {
        await axios.post(`http://localhost:8080/team`, formData);
      }
      fetchTeamMembers();
      handleClose();
    } catch (err) {
      console.error('Failed to add/update team member', err);
      alert('Failed to add/update team member');
    }
  };

  const handleEdit = (teamMember) => {
    setTeamMemberData({
      image: teamMember.image,
      name: teamMember.name,
      post: teamMember.post,
      whatsappNumber: teamMember.whatsapp,
      email: teamMember.email,
      mobileNumber: teamMember.mobile
    });
    setEditMode(true);
    setCurrentTeamMember(teamMember._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/team/${id}`);
      fetchTeamMembers();
    } catch (error) {
      console.error('Failed to delete team member', error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
     <h1> Our Team</h1>
      <Button variant="primary" onClick={handleShow} style={{margin:'15px'}}>
        Add Team Member
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit' : 'Add'} Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={teamMemberData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Post</Form.Label>
              <Form.Control
                type="text"
                name="post"
                value={teamMemberData.post}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="tel"
                name="whatsappNumber"
                value={teamMemberData.whatsappNumber}
                onChange={handleChange}
                pattern="[0-9]+"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={teamMemberData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="mobileNumber"
                value={teamMemberData.mobileNumber}
                onChange={handleChange}
                pattern="[0-9]+"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editMode ? 'Update' : 'Add'} Team Member
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        {teamMembers.map((member) => (
          <Col key={member._id} xs={12} md={6} lg={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`http://localhost:8080/uploads/${member.image}`} />
              <Card.Body>
                <Card.Title>Name: {member.name}</Card.Title>
                <Card.Text>Post: {member.post}</Card.Text>
                <Card.Text>WhatsApp: {member.whatsapp}</Card.Text>
                <Card.Text>Email: {member.email}</Card.Text>
                <Card.Text>Mobile: {member.mobile}</Card.Text>
                <Button variant="primary" onClick={() => handleEdit(member)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(member._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
    </>
  );
}

export default Team;
