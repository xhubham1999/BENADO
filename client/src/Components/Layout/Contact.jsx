import React from 'react'
import {Container} from 'react-bootstrap'
import Sidebar from '../Sidebar';
import Navbar from '../Navbr';


function Contact() {
  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
    <div>Contact</div>
    </Container>
    </>
  )
}

export default Contact