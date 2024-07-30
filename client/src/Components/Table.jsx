import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa'; // Icon for dropdown
import './style/Table.css'

const OrderTable = ({ orders, onStatusChange }) => {
  const handleChangeStatus = (orderId, newStatus) => {
    // Handle status change here, e.g., call a function passed as prop
    onStatusChange(orderId, newStatus);
  };

  return (
    <Table striped bordered hover responsive className="order-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>SKU</th>
          <th>Amount</th>
          <th>Customer Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.productId}</td>
            <td><img src={order.image} alt={order.title} className="product-image" /></td>
            <td>{order.title}</td>
            <td>{order.sku}</td>
            <td>{order.amount}</td>
            <td>{order.customerName}</td>
            <td>
              <Dropdown onSelect={(eventKey) => handleChangeStatus(order.id, eventKey)}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {order.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                  <Dropdown.Item eventKey="ready">Ready</Dropdown.Item>
                  <Dropdown.Item eventKey="in-transit">In-transit</Dropdown.Item>
                  <Dropdown.Item eventKey="complete">Complete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderTable ;
