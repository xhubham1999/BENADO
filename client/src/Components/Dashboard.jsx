import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './Navbr';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{position:'absolute', width:'80.5%',right:'0'}}>
        <Container fluid>
        <TopNavbar/>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
