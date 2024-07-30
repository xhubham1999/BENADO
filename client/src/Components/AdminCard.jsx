import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaClipboardList, FaTruck, FaUsers } from 'react-icons/fa'; // Import icons from react-icons library
import './style/cardsection.css'; // Updated CSS file for styling

const AdminCard = ({ todayOrders, inTransitOrders, totalCustomers }) => {
  return (
    <Card className="admin-card">
      <Card.Body>
       
        <Row>
          <Col className="order-col">
            <div className="card-section">
              <FaClipboardList className="icon" />
              <h5>Today's Orders</h5>
              <p className="card-value">{todayOrders}</p>
            </div>
          </Col>
          <Col className="intransit-col">
            <div className="card-section">
              <FaTruck className="icon" />
              <h5>In-transit Orders</h5>
              <p className="card-value">{inTransitOrders}</p>
            </div>
          </Col>
          <Col className="customers-col">
            <div className="card-section">
              <FaUsers className="icon" />
              <h5>Total Customers</h5>
              <p className="card-value">{totalCustomers}</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AdminCard;
