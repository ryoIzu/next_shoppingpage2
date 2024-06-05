"use client";
//import styles from '../page.module.css';
import './register.css';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {Col, Container, Form, FormGroup, Input, Label, Row, Button} from "reactstrap";
import {useState} from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //登録ボタンのハンドラー
  const doRegister = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //ユーザ登録すると自動的にログイン、userCredential.userでユーザ情報取得
      const user = userCredential.user;
      alert('登録完了');
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
      if(error.code === 'auth/email-already-in-use') {
        alert('そのメールアドレスはすでに利用されています、死ね');
      }
      
    })
  }

  return(
    <>
    <div className='div'>
      <h1>新規登録</h1>
      <div>
        <Form>
          <FormGroup>
            <Label>メールアドレス：</Label>
            <Input
              type='email'
              name='email'
              style={{height:50, fontSize: "1.2rem"}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>パスワード：</Label>
            <Input
              type='password'
              name='password'
              style={{height:50, fontSize: "1.2rem"}}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button style={{width:220}} color='primary' onClick={
            ()=>{
              doRegister();
            }
          }>
            登録
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
}