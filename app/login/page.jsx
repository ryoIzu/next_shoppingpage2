/*
ログイン関係
 */

'use client';

import React, {useState} from 'react';
import "./login.css";
import Header from '../Components/Header/Header';
import { getAuth, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useAuth } from '../context/authContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {currentUser} = useAuth();
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const  handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const doLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const  user = userCredential.user;
      alert("ログインok!");
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
      if(error.code === 'auth/invalid-credential') {
        alert("メールアドレスもしくはパスワードが間違っています");
      }
    });
  };

  const doLogout = () => {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
      // ログアウトされたことをわかりやすくするためのアラート
      alert( 'ログアウト完了！' );
    })
    .catch((error) => {
      console.log(error);
    });
  };


  return(
    <div className='body'>
      <div className='content'>
        {currentUser ?(
          <>
          <div suppressHydrationWarning={true}>
            <div style={{ paddingBottom: "1rem" }}>{ currentUser.email } でログインしています。</div>
          </div>
          <button className='button' onClick={() =>{
            doLogout();
          }}>
            Sign out
          </button>
          </>
        ):(
          <>
            <div className='input'>
              メールアドレス：
              <input
                type='text'
                name='username'
                id='password'
                className='password'
                onChange={handleEmail} 
              />
            </div>
            <div className='input'>
              パスワード：
              <input
                type='password'
                name='password'
                id='password'
                className='password'
                onChange={handlePassword} 
              />
            </div>
            <button className='button' onClick={() => {
              doLogin();
            }}>
              Sign in
            </button>
          </>
        )}
        <div className='others'>
          <a href='../register/'>新規登録</a>
          <a href='../forget_password'>パスワードを忘れた！</a>
        </div>
      </div>

    </div>
  );
};

export default Login;