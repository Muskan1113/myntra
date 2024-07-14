import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ItemCard from './ItemCard';

const ItemList = ({ items, handleClick,cart}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        minHeight: '100vh', // Ensures the container covers at least the viewport height
        p: 2, // Add some padding around the container
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {items.map((item, index) => (
          
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ItemCard item={item} handleClick={handleClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemList;
