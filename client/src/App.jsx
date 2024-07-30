
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Team from './Pages/Team';
import Product from './Pages/Product';
import Home from './Pages/Home';


import Features from './Components/Layout/Features';
import Service from './Components/Layout/Service';
import Teatimonials from './Components/Layout/Teatimonials';
import Contact from './Components/Layout/Contact';
import BasicSetting from './Components/Layout/BasicSetting';
import Project from './Components/Layout/Project';
import ChatAssistant from './Pages/ChatAssistent';
import SignupForm from './Components/Signup';
import AuthForm from './Components/Signup' ; // Assuming this is where login happens
import Orders from './Pages/Orders';


const App = () => {
 
  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if authenticated */}
        <Route path="/" element={<Home/>}/>
        
   
          
       
        <Route path="home" element={<Home/>}/>
          <Route path="team" element={<Team />} />
          <Route path="product" element={<Product />} />
          <Route path="orders" element={<Orders />} />
          <Route path="layout">
            
            <Route path="features" element={<Features />} />
            <Route path="basicsetting" element={<BasicSetting />} />
            <Route path="services" element={<Service />} />
            <Route path="projects" element={<Project />} />
            <Route path="testimonials" element={<Teatimonials />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="chat" element={<ChatAssistant />} />
      </Routes>
        </Router>
   
  );
};

export default App;
