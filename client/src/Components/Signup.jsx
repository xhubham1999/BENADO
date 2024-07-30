import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const AuthForm = () => {
  const [formType, setFormType] = useState('signup'); // 'signup' or 'login'
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/signup', signupData);
      console.log(res.data);

      toast.success('Signup successful!');
      
      setSignupData({
        username: '',
        email: '',
        password: ''
      });
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
      toast.error('Signup failed. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/login', loginData);
      console.log(res.data);

      toast.success('Login successful!');

      localStorage.setItem('token', res.data.token);
      
      setLoginData({
        email: '',
        password: ''
      });

      // Redirect to dashboard after successful login
      navigate("/Home");
      onLogin()

    } catch (err) {
      console.error(err.response.data);
      toast.error('Login failed. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  };

  const formContainerStyle = {
    maxWidth: '400px',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  const tabStyle = {
    padding: '10px 20px',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    marginRight: '5px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#4CAF50',
    color: 'white',
  };

  const inactiveTabStyle = {
    ...tabStyle,
    backgroundColor: '#f1f1f1',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div
            onClick={() => setFormType('signup')}
            style={formType === 'signup' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = formType === 'signup' ? '#45a049' : '#e1e1e1')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = formType === 'signup' ? '#4CAF50' : '#f1f1f1')}
          >
            Signup
          </div>
          <div
            onClick={() => setFormType('login')}
            style={formType === 'login' ? activeTabStyle : inactiveTabStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = formType === 'login' ? '#45a049' : '#e1e1e1')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = formType === 'login' ? '#4CAF50' : '#f1f1f1')}
          >
            Login
          </div>
        </div>
        {formType === 'signup' ? (
          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Signup</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              style={inputStyle}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              style={inputStyle}
              required
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Signup
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              style={inputStyle}
              required
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Login
            </button>
          </form>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AuthForm;
