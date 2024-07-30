import React from 'react';
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const TopNavbar = () => {
  const avatarStyle = {
    marginRight: '8px',
  };

  const dropdownToggleStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      await axios.post('http://localhost:8080/logout', {}, { // Ensure the correct backend URL
        headers: {
          'Authorization': `Bearer ${token}` // Prepend 'Bearer ' to the token
        }
      });

      localStorage.removeItem('token'); // Remove token from localStorage
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container style={{ height: '50px' }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ position: 'absolute', right: '7rem', top: '4px' }}>
            <NavDropdown
              title={
                <span style={dropdownToggleStyle}>
                  <Image
                    src="https://via.placeholder.com/30"
                    roundedCircle
                    style={avatarStyle}
                  />
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
