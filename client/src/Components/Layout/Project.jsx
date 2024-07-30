import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import Navbar from '../Navbr';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Projects() {
  
  const [show, setShow] = useState(false);
  const [projectsData, setProjectsData] = useState({
    image: null,
    title: '',
    description: '',
    developer: '',
    link: '',
  });
  const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setProjectsData({ image: null, title: '', description: '', developer: '', link: '' });
    setEditMode(false);
    setCurrentProjectId(null);
  };
  
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProjectsData({ ...projectsData, [name]: files[0] });
    } else {
      setProjectsData({ ...projectsData, [name]: value });
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', projectsData.image);
    formData.append('title', projectsData.title);
    formData.append('description', projectsData.description);
    formData.append('developer', projectsData.developer);
    formData.append('link', projectsData.link);

    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/projects/${currentProjectId}`, formData);
      } else {
        await axios.post(`http://localhost:8080/projects`, formData);
      }
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const handleEdit = (project) => {
    setProjectsData({
      image: project.image,
      title: project.title,
      description: project.description,
      developer: project.developer,
      link: project.link,
    });
    setEditMode(true);
    setCurrentProjectId(project._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Project' : 'Add Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Title"
                name="title"
                value={projectsData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={projectsData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDeveloper" className="mb-3">
              <Form.Label>Developer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Developer Name"
                name="developer"
                value={projectsData.developer}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLink" className="mb-3">
              <Form.Label>Project Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Project Link"
                name="link"
                value={projectsData.link}
                onChange={handleChange}
              />
            </Form.Group>
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
        {projects.map((project) => (
          <Card key={project._id} className="md-14" style={{ width: '14rem',  height:'auto' ,margin: '20px' }}>
            <Card.Img
              variant="top"
              src={`http://localhost:8080/uploads/${project.image}`}
              alt="Project Image"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-2">
                View Project
              </a>
              <p className="text-muted">Developer: {project.developer}</p>
              <Button variant="warning" onClick={() => handleEdit(project)}>
                Edit
              </Button>
              <Button
                variant="danger"
                className="ms-2"
                onClick={() => handleDelete(project._id)}
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

export default Projects;
