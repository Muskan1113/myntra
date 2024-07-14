import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import Header from './components/Header';
import ItemList from './components/ItemList';
import clothesList from './components/clothes.json';

import { Box, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [cart, setCart] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility

  const handleClick = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    console.log(cart)
  };

  const toggleChat = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen); // Toggle chat visibility
  };

  return (
    <Router>
      <Box>
        <Header />
        <ItemList items={clothesList} handleClick={handleClick} cart={cart} />
        
        {/* Chat tab */}
        <IconButton
          onClick={toggleChat}
          sx={{
            position: 'fixed',
            top: '100px',
            right: '10px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            zIndex: 1000,
          }}
        >
          <ChatIcon color={isChatOpen ? 'secondary' : 'primary'} fontSize="large" />
        </IconButton>
        
        {/* Conditionally render ChatPage */}
        {isChatOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: '0',
              right: '0',
              width: '100%',
              maxWidth: '400px',
              height: '100%',
              backgroundColor: '#fff',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              zIndex: 999,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #ddd',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Typography variant="h6">Chat</Typography>
              <IconButton
                onClick={toggleChat}
                sx={{ 
                  color: '#dc3545',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <ChatPage items={cart} />
          </Box>
        )}
      </Box>
    </Router>
  );
}

export default App;
