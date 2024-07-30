import React from 'react'
import {Container} from 'react-bootstrap'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbr';


function Orders() {
  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
    <div>Orders</div>
    </Container>
    </>
  )
}

export default Orders