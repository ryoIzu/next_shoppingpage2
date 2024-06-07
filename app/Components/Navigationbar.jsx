'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navigationbar.css";
import { useAuth } from '../context/authContext';
import { LiaSignOutAltSolid } from "react-icons/lia";
import { LiaSignInAltSolid } from "react-icons/lia";
import { BsCart4 } from "react-icons/bs";

import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';


function Navigationbar() {
  const  {currentUser} = useAuth();
  const router = useRouter();
  const [mouseHover_cart, setMouseHover_cart] = useState(false);
  const [mouseHover_signIn, setMouseHover_signIn] = useState(false);
  const [mouseHover_signOut, setMouseHover_signOut] = useState(false); 
  const handleSignOut = () => {
    const auth = getAuth();
    
    signOut(auth)
    .then(() => {
      // ログアウトされたことをわかりやすくするためのアラート
      //alert( 'ログアウト完了！' );
      router.push('/login');
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  return(
    <div className='main'>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">M & D</Navbar.Brand>
          <Nav className="me-auto" id='me-auto'>
            
            <Nav.Link className='left'><Link href="./" className='navContent'>goods</Link></Nav.Link>
            <div className='ms-auto'>
            {currentUser ? (
              <>
                <Nav.Link className='navContent'>{currentUser.email}</Nav.Link>
                <div className='message'>
                    <Nav.Link className='signOut'>
                      <Link href='../cart'>
                      <BsCart4 
                        className='icon'
                        size={25}
                        color={mouseHover_cart ? 'rgb(0,255,174)' :'#ccc'}
                        onMouseEnter={() => setMouseHover_cart(true)}
                        onMouseLeave={() => setMouseHover_cart(false)} />
                      <span className='remark'>cart</span>
                      </Link>
                    </Nav.Link>
                  
                </div>
                <div className='message'>
                  <Nav.Link className='signOut' onClick={() =>{handleSignOut();}}>
                    <LiaSignOutAltSolid 
                      className='icon'
                      size={25}
                      color={mouseHover_signOut ? 'rgb(0,255,174)' :'#ccc'}
                      onMouseEnter={() => setMouseHover_signOut(true)}
                      onMouseLeave={() => setMouseHover_signOut(false)}/>
                    <span className='remark'>sign out</span>
                  </Nav.Link>  
                </div>
              </>
            ):(
              <>
              <div className='message'>
                  <Nav.Link className='signIn' href='./login'>
                    <LiaSignInAltSolid 
                      className='icon'
                      size={30}
                      color={mouseHover_signIn ? 'rgb(0,255,174)' :'#ccc'}
                      onMouseEnter={() => setMouseHover_signIn(true)}
                      onMouseLeave={() => setMouseHover_signIn(false)}/>
                    <span className='remark'>sign in</span>
                  </Nav.Link>  
              </div>
                
              </>
            )}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;