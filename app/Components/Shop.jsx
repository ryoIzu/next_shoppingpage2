"use client";

import React, {useContext, useEffect, useState} from "react";
import "./shop.css";
import Item from './Item';
import { ShopContext } from "../context/shop-context";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Shop() {
  const {items} = useContext(ShopContext);

  return(
    <>
    <Container style={{marginTop: '80px' }}>
      <Row className="itemsDev">
      <h2>MPLUSPLUS DANCERS</h2>
      </Row>
      <Row>
        <Col>
          <Image
            src="../mplpldancers.png" //配置した画像のパスを記述する。
            thumbnail
            style={{border: 'none'}}
          />
        </Col>
        <Col className="colStyle">
        RUINS OF THE PAINTED DAY
Dustin Yellin tells stories that weave together the diverse forces of nature and technology. Through his multidisciplinary body of work, which includes object making, painting and animation, Yellin draws attention to the interconnectivity of all beings and things. His approach tunnels across traditionally siloed fields so as to crystallize the idea that both the human world, and all other worlds around us, are a collection of enmeshed networks - even if many are hidden.

Yellin’s glass works in particular, in which paint and images clipped from various print media are embedded within laminated glass sheets to form grand pictographic allegories, invite viewers to engage with the legions of their own consciousness and its embodied emotions, as well as that of our collective society and its infrastructures. The artist balances descriptive poetry with a prescriptive social practice so as to span new ways of seeing and being, and build a bridge to a more holistic world.
        </Col>
      </Row>
      <Row className="itemsDev">
        <Col>
        <div className="products">
          {items.map((item,index) =>(
            <Item
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              description={item.description}
              category={item.category}
              key={item.id} 
            />
          ))}
        </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Shop;