import React,{useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';



const ItemCard = ({ item,handleClick }) => {
  const [addedInCart, setAddedInCart] = useState(false);
  return (
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
      <CardMedia
        component="img"
        height="200"
        image={item.imageUrl}
        alt={item.name}
        sx={{ objectFit: 'cover', borderRadius: '2px 2px 0 0' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {
          if(!addedInCart){
            setAddedInCart(true)
            handleClick(item)
          
          }
          }}>
               {addedInCart ? 'Added' : 'Add to cart'}   
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
