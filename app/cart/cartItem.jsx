"use client";

import {ShopContext} from "../context/shop-context";
import React, {useContext} from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CartItem(props) {
  const {id, title, image, price} = props.data;
  const {cartItems, addToCart, removeFromCart, updateCartItemCount} =useContext(ShopContext);

  return(
    <>
    <Card border="secondary" style={{ width: '20rem' }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Img variant="left" src={image} width={'20%'}/>
          <Card.Text>
            Amount: {cartItems[id]}<br />
            Price: ${price * cartItems[id]}
          </Card.Text>
          <Button 
          key= 'id'
          variant="outline-secondary"
          type="button"
          onClick={() => removeFromCart(id)}
          >Delete
          </Button>
          <Button 
            key= 'id'
            variant="outline-secondary"
            type="button"
            onClick={() => addToCart(id)}
          >Add
          </Button>
        </Card.Body>
      </Card>
    </>
      
  );
}

export default CartItem;