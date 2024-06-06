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

function Navigationbar() {
  const  {currentUser} = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth();
    
    signOut(auth)
    .then(() => {
      // ログアウトされたことをわかりやすくするためのアラート
      alert( 'ログアウト完了！' );
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
            <Nav.Link href="./">home</Nav.Link>
            <Nav.Link href="./">about</Nav.Link>
            <Nav.Link href="./">goods</Nav.Link>
            <div className='ms-auto'>
            {currentUser ? (
              <>
                <Nav.Link >{currentUser.email}</Nav.Link>
                <div className='message'>
                  <Nav.Link className='signOut' href='./cart'>
                    <BsCart4 size={25} color={'#ccc'}/>
                    <span className='remark'>cart</span>
                  </Nav.Link>
                </div>
                <div className='message'>
                  <Nav.Link className='signOut' onClick={() =>{handleSignOut();}}>
                    <LiaSignOutAltSolid size={25} color={'#ccc'}/>
                    <span className='remark'>sign out</span>
                  </Nav.Link>  
                </div>
              </>
            ):(
              <>
              <div className='message'>
                  <Nav.Link className='signIn' href='./login'>
                    <LiaSignInAltSolid size={30} color='#ccc'/>
                    <span className='remark'>sign in</span>
                  </Nav.Link>  
                </div>
                <Nav.Link></Nav.Link>
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