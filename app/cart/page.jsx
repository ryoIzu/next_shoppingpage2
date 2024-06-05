'use client';

import React ,{useContext} from 'react';
import "./cart.css";
import CartItem from "./cartItem";
import { ShopContext } from '../context/shop-context';
import Link from 'next/link';
import LinkButton from "../Components/LinkButton";
import {useAuth} from '../context/authContext';
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
    {currentUser ? (
      <div className='cartPage'>
        <div>
          <h1>カートの商品</h1>
        </div>
        <div className='cart'>
          {
            items.map((item) => {
              if(cartItems[item.id] != 0) {
                return <CartItem data={item} key={item.id}/>
              }
            })
          }
        </div>

        {totalAmount > 0 ? (
          <div className='checkout'>
            <p className='total'>合計：${totalAmount}</p>
            <button id='clearCartBtn' onClick={() => {
              clearCart();
            }}>
              カートを空にする
            </button>
            <div className='checkout'>
              <p >小計： ${totalAmount}</p>
              <LinkButton />
            </div>
          </div>
        ):(
          <div className='empty'>
            <h1>cart is empty</h1>
          </div>
        )}
        
      </div>
    ):(
      <div className='cartPage'>
      <p>サインインしてください</p>
      </div>
    )}
    </>
  );
};

export default Cart;