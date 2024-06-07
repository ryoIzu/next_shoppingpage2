'use client';
import styles from '../page.module.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import { useEffect, useState } from 'react';
import './forget_password.css';
import {useRouter} from 'next/navigation';

//react boot strap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

export default function Login() {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

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
            alert( 'The email for resetting password has been sent.' );
            console.log(email);
          })
          .catch((error) => {
            console.log(error);
            switch(error.code) {
              case 'auth/invalid-email':
                setErr('The email address format is not correct.');
              break;
              case 'auth/user-not-found':
                setErr('This email is not registered.');
              break;
              default :
                alert('Error has been ocurred.');
              break;
            }
      });
  };

  useEffect(() => {
    setErr('');
  },[email, router.pathname]);

  return (
    <div id='main'>
      <h1>Reset password</h1>
      <div>
        <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>
                Email address: 
              </Form.Label>
              <Form.Control
                type="email"
                placeholder = "cfcl@cfcl.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
                variant="outline-primary"
                onClick={()=>{
                  doResetEmail();
                }}
              >
              send Email
            </Button>
        </Form>
        {err && <Alert variant='warning'>{err}</Alert>}
      </div>
    </div>
  )
}

