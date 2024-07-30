import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaProductHunt ,FaShippingFast  } from 'react-icons/fa';
import { LuLayoutList } from "react-icons/lu";
import { PiChatsCircleDuotone } from "react-icons/pi";

import './style/sidebar.css';

const Sidebar = () => {

  return (
    <div className={`Sidebar d-flex flex-column vh-100 bg-dark text-white `}>
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
        <h2 className="text-center mb-0">Admin</h2>
      </div>
      <Nav className="flex-column flex-grow-1 nav" style={{ marginTop: "40px" }}>
        <Nav.Item className="border-bottom Nav-item">
          <Nav.Link as={Link} to="/home" className="text-white">
            <FaHome /> Home
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title={<span className="text-white"><LuLayoutList /> Layout</span>} id="layout-dropdown" className="border-bottom" style={{height:'60px', marginLeft:'10px'}}>
        
          <NavDropdown.Item as={Link} to="/layout/features">FEATURES</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/layout/basicSetting">BASIC SETTING</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/layout/services">SERVICES</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/layout/projects">PROJECTS</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/layout/testimonials">TESTIMONIALS</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/layout/contact">CONTACT</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item className="border-bottom Nav-item">
          <Nav.Link as={Link} to="/team" className="text-white">
            <FaUsers /> Team
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="border-bottom Nav-item">
          <Nav.Link as={Link} to="/product" className="text-white">
            <FaProductHunt  /> Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="border-bottom Nav-item">
          <Nav.Link as={Link} to="/orders" className="text-white">
            <FaShippingFast  /> Orders
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item className="border-bottom Nav-item">
          <Nav.Link as={Link} to="/chat" className="text-white">
            <PiChatsCircleDuotone /> ChatAssistent
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
