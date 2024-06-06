"use client";
import { ShopContext } from '../context/shop-context';
import React, {useContext} from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import './Item.css'

function Item(props) {
  const {id, title, image, price, description, category} = props;
  const {addToCart, cartItems} = useContext(ShopContext);
  const cartItemCount = cartItems[id];
  return(
    <>
      <Card style={{width: '400px' ,height: '400px',padding: '10px', border: 'none'}}>
      <Card.Img className='card-img-top' variant='top' src={image} />
      <Card.Body style={{padding: '5px'}}>
      <Button variant='outline-dark' onClick={() => addToCart(id)}>
        Add to Cart 
        {cartItemCount > 0 && <span>({cartItemCount})</span>}
      </Button>
      <Card.Subtitle className='mb-2 text-muted' style={{padding: '5px'}}>{title}</Card.Subtitle>
      <Card.Text>${price}</Card.Text>
        
      </Card.Body>
    </Card>
    </>

  );
}

export default Item;