'use client';

import React ,{useContext} from 'react';
import "./cart.css";
import CartItem from "./cartItem";
import { ShopContext } from '../context/shop-context';
import Link from 'next/link';
import LinkButton from "../Components/LinkButton";
import {useAuth} from '../context/authContext';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge  from 'react-bootstrap/Badge';

import Button from 'react-bootstrap/Button';

import HorizontalLine from '../Components/HorizontalLine/HorizontalLine';


//<b>タグはボールドしてくれる

const Cart = () => {
  const {currentUser} = useAuth();
  const {items, cartItems, getTotalCartAmount, clearCart} = useContext(ShopContext);

  const totalAmount = Math.round(getTotalCartAmount() * 100) / 100;
  const handleContinue = ({to}) => {
    console.log("pushed");
  }

  return(
    <>
    <div className='cartContainer'>
    <Container style={{textAlign: 'center'}}>
      <Row >
      <h2>Items in the cart</h2>
      </Row>
      <Row>
        <Col style={{width: '50%'}}>
        {
            items.map((item) => {
              if(cartItems[item.id] != 0) {
                return <CartItem data={item} key={item.id}/>
              }
            })
          }
          <div style={{textAlign: 'left'}}>
          <Button 
            key= 'id'
            variant="outline-secondary"
            type="button"
            onClick={() => clearCart()}
          >Clear the cart.
          </Button>
          </div>
        </Col>
        <Col className='col_right' style={{textAlign: 'end', position:'fixed'}}>
          {
            items.map((item)=>{
              if(cartItems[item.id] != 0) {
                return<p>{item.title} ...${item.price} x {cartItems[item.id]}: ${item.price * cartItems[item.id]}</p>
              }
            })
          }
          <HorizontalLine width='100%' bgColor='#2e2e2e' marginTop='10px'/>
          {
            totalAmount > 0 ? (
              <>
                <h4>Total amount: ${totalAmount}</h4>
                <LinkButton />
              </>
              
            ):(
              <p>The cart is empty.</p>
            )
          }

        </Col>
      </Row>
    </Container>
    </div>
    </>
  );
};

export default Cart;