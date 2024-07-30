import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AdminCard from '../Components/AdminCard';
import OrderTable  from '../Components/Table';
import ProductTable from '../Components/ProductTable';

import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbr';

const Home = () => {
  // card section data
  const todayOrders = 5; // Replace with dynamic data
  const inTransitOrders = 8; // Replace with dynamic data
  const totalCustomers = 200; // Replace with dynamic data

  // table data for order details 
  const [orders, setOrders] = useState([
    {
      id: 1,
      productId: 'P001',
      image: 'https://via.placeholder.com/50',
      title: 'Product 1',
      sku: 'SKU001',
      amount: '$100',
      customerName: 'John Doe',
      status: 'Pending'
    },
    {
      id: 2,
      productId: 'P002',
      image: 'https://via.placeholder.com/50',
      title: 'blue shirt for men ',
      sku: 'SKU002',
      amount: '$150',
      customerName: 'Jane Smith',
      status: 'Ready'
    }
    // Add more orders as needed
  ]);

  // Function to handle status change
  const handleStatusChange = (orderId, newStatus) => {
    // Update the status in state or make an API call
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // ========product details====
  const products = [
    {
      id: 1,
      sku: 'SKU001',
      image: 'https://via.placeholder.com/50',
      title: 'Product 1',
      price: '$100',
      stock: 10,
      category: 'Category A',
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      color: 'Red',
      size: 'Large'
    },
    {
      id: 2,
      sku: 'SKU002',
      image: 'https://via.placeholder.com/50',
      title: 'Product 2',
      price: '$150',
      stock: 5,
      category: 'Category B',
      rating: 4.2,
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      color: 'Blue',
      size: 'Medium'
    }
    // Add more products as needed
  ];

  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
      <AdminCard
        todayOrders={todayOrders}
        inTransitOrders={inTransitOrders}
        totalCustomers={totalCustomers}
      />
  
{/* order table */}
<div className="parent-container" style={{marginTop:'40px'}}>
<h2>Order Details</h2>
<OrderTable  orders={orders} onStatusChange={handleStatusChange} />
</div>

{/* product table */}
<div className="parent-container">
      <h2>Product List</h2>
      <ProductTable products={products} />
    </div>
    </Container>
</>
  );
};

export default Home;
