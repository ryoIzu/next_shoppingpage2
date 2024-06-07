/*
ログイン関係
 */

'use client';

import React, {useState, useEffect} from 'react';
import "./login.css";
import Header from '../Components/Header/Header';
import { getAuth, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import { useAuth } from '../context/authContext';
import { useRouter} from 'next/navigation';

//react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import HorizontalLine from '../Components/HorizontalLine/HorizontalLine';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {currentUser} = useAuth();
  const [err,setErr] = useState('');
  const router = useRouter();
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const  handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  }
  const doLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const  user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error.code);
      if(error.code === 'auth/invalid-credential') {
        setErr('The email address or password is not correct.');
      }
      else if(error.code === 'auth/invalid-email') {
        setErr('The email address format is not correct.');
      }
    });
  };

  const doLogout = () => {
    const auth = getAuth();
    
    signOut(auth)
    .then(() => {
      // ログアウトされたことをわかりやすくするためのアラート
      //alert( 'ログアウト完了！' );
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    setErr('');
  },[email, password,router.pathname]);


  return(
    <>
    <div className='formMain'>
      {currentUser ? (
        <>
        <div className='sign-out'>
        <div suppressHydrationWarning={true}>
            <div style={{ paddingBottom: "1rem" }}>Signing in as "{ currentUser.email }"</div>
          </div>
          <Button variant='outline-secondary' type='button' onClick={()=>{doLogout();}}>
            Sign out
          </Button>
        </div>
          
        </>
      ):(
        <>
        <div className='sign-in'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="cfcl@cfcl.com"
                onChange={handleEmail} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="password"
                onChange={handlePassword}
                />
              <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              {/*<Form.Check type="checkbox" label="Check me out" />*/}
            </Form.Group>
            <Button 
              variant="outline-primary" 
              type="button"
              onClick={()=> {doLogin();}} >
              Sign in
            </Button>
          <a href='../forget_password'style={{marginLeft: '20px'}}>Did you forget your password?</a>
          </Form>
          <HorizontalLine width='100%' bgColor='#2e2e2e' marginTop='20px'/>
          <div style={{marginTop: '20px'}}>
          <a href='../register/'>Create new account.</a>
          </div>
          {err && <Alert variant='warning'>{err}</Alert>}
        </div>
        </>
      )}
      
    </div>
    </>
  );
};

export default Login;