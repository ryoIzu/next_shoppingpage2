"use client";
//import styles from '../page.module.css';
import './register.css';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errPassword,setErrPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');

  const router = useRouter();
  //登録ボタンのハンドラー
  const doRegister = () => {
    const auth = getAuth();
    if(password.length < 10){
      setErrPassword('Please set password to 10 characters or more.');
      return;
    }


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //ユーザ登録すると自動的にログイン、userCredential.userでユーザ情報取得
      const user = userCredential.user;
      alert('Happy created.');
      console.log(user);
      router.push('./');
    })
    .catch((error) => {
      console.log(error);
      if(error.code === 'auth/email-already-in-use') {
        setErrEmail('This email address has already used.');
      } else if(error.code === 'auth/invalid-email') {
        setErrEmail('The email address format is not correct.');
      }
      
    })
  }

  //なぜかuseRouterが入らないい。
  useEffect(()=> {
    setErrEmail('');
  },[email]);
  useEffect(()=>{
    setErrPassword('');
  },[password]);

  return(
    <>
    <div className='div'>
      <h2>Register new account</h2>
      <div>
        <Form>
          <Form.Group className='mb-3' controlId='forBasicEmail'>
            <Form.Label>Email address: </Form.Label>
            <Form.Control
              type='email'
              placeholder="cfcl@cfcl.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text>
              {errEmail && <Alert variant='warning'>{errEmail}</Alert>}
            </Form.Text>
          </Form.Group>

          <FormGroup>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text>
              {errPassword && <Alert variant='warning'>{errPassword}</Alert>}
            </Form.Text>
          </FormGroup>
          <Button
            variant='outline-primary'
            type='button'
            onClick={()=>{doRegister();}
          }>
            Register
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
}