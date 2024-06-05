'use client';
import styles from '../page.module.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState } from 'react';
import './forget_password.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const functions = getFunctions();

  const doResetEmail = async () => {
    const auth = getAuth();
    const actionCodeSettings = {
      // パスワード再設定後にログイン画面にリダイレクトさせる
      url: 'http://localhost:3000/login',
      handleCodeInApp: false,
    }
    sendPasswordResetEmail(auth, email, actionCodeSettings)
          .then(() => {
            // パスワード再設定のメールが送信されたことをわかりやすくするためのアラート
            alert( '上記メールアドレスに再設定用リンクを送りました' );
            console.log(email);
          })
          .catch((error) => {
            console.log(error);
            switch(error.code) {
              case 'auth/invalid-email':
                alert('メールアドレスの形式が正しくありません。');
              break;
              case 'auth/user-not-found':
                alert('そのメールアドレスは登録されていません。');
              break;
              default :
                alert('エラーが発生しました。');
              break;
            }
      });
  };

  return (
    <div id='main'>
      <h1>パスワード再設定</h1>
      <div>
        <Form>
            <FormGroup>
              <Label>
                メールアドレス：
              </Label>
              <Input
                type="email"
                name="email"
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Button
                style={{ width: 220 }}
                color="primary"
                onClick={()=>{
                  doResetEmail();
                }}
              >
              送信
            </Button>
        </Form>
      </div>
    </div>
  )
}

