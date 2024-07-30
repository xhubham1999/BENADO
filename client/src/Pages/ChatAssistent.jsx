import React, { useState } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbr';


const ChatAssistant = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const newChat = [...chat, { sender: 'user', message: input }];
    setChat(newChat);
    setInput('');

    try {
      const response = await axios.post('http://localhost:8080/chat', { prompt: input });
      const botMessage = response.data.response.generated_text;
      setChat([...newChat, { sender: 'bot', message: botMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Navbar/>
    <Sidebar/>
    <Container  style={{width:"76%", position:'absolute', right:'50px'}} >
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <div style={{ marginBottom: '20px', minHeight: '200px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '8px', borderRadius: '8px', backgroundColor: msg.sender === 'user' ? '#f0f0f0' : '#e0f7fa', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.message}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
    </Container>
    </>
  );
};

export default ChatAssistant;
