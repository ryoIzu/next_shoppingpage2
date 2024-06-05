//カートに入れたり、出したり、計算したり
//ここで商品情報を諸々管理。

/*
quiitaの参考ページではshop.jsxで商品情報の取得をしていたが、
それでは動かないので、shop-context内で取得して、useContextで
一緒に管理させる方が良いと思う。
*/

"use client"
import {createContext, useState, useEffect} from 'react';
import items from '../Components/Shop';
export const ShopContext = createContext(null);

//カート内の初期状態生成
const getDefaultCart = () => {
  const productLength = 20;
  let cart = {};
  for(let i=1; i< productLength +1;++i) {
    cart[i] = 0;
  }
  return cart;
}

export const ShopContextProvider = (props) => {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((json) => {
      console.log(json);
      setItems(json);
    });
  },[]);

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
      if(cartItems[item] > 0) {
        let itemInfo = items.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;//cartItem[n]はその商品の個数
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    console.log("add  to cart");
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId] +1}));
    console.log("cartItems: " + cartItems[itemId] + cartItems[itemId+1]  );
    
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId] -1}));
  };
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: newAmount}));
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };
  const contextValue = {
    items,
    cartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    clearCart
  };
  return(
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}