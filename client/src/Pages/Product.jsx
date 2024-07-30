import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbr';

const Product = () => {
  
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    shortDescription: "",
    description: "",
    image: null,
    category: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('shortDescription', product.shortDescription);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('image', product.image);

    try {
      let res;
      if (isEdit) {
        res = await axios.put(`http://localhost:8080/products/${editIndex}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const updatedProducts = [...products];
        updatedProducts[editIndex] = res.data;
        setProducts(updatedProducts);
      } else {
        res = await axios.post(`http://localhost:8080/products`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setProducts([...products, res.data]);
      }

      setProduct({
        title: "",
        price: "",
        shortDescription: "",
        description: "",
        image: null,
        category: ""
      });
      handleClose();
    } catch (err) {
      console.error('Error submitting product:', err);
    }
  };

  const handleDelete = async (index) => {
    try {
      const productId = products[index]._id;
      await axios.delete(`http://localhost:8080/products/${productId}`);
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (index) => {
    const productToEdit = products[index];
    setProduct(productToEdit);
    setEditIndex(index);
    setIsEdit(true);
    handleShow();
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Container style={{ width: "76%", position: 'absolute', right: '50px' }}>
        <div className="addproduct">
          <h1>Products</h1>
          <Button variant="primary" onClick={() => { handleShow(); setIsEdit(false); setEditIndex(null); }}>
            Add Product
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{isEdit ? 'Edit' : 'Add'} Product Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Short Description"
                    name="shortDescription"
                    value={product.shortDescription}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option>Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  {isEdit ? 'Update' : 'Add'} Product
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <div className="row product">
          {products.map((prod, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Card>
                <Card.Img variant="top" src={`http://localhost:8080/images/${prod.image}`} height="150" />
                <Card.Body>
                  <Card.Title>{prod.title}</Card.Title>
                  <Card.Text>{prod.shortDescription}</Card.Text>
                  <Card.Text>${prod.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Product;
