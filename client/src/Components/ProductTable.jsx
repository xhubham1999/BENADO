import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './style/productDetails.css'

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-list-table">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td><img src={product.image} alt={product.title} className="product-image" /></td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(product)}>
                  <FaEdit />
                </Button>
                {' '}
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
