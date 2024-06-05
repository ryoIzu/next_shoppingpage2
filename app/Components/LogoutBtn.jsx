'use client';
import Link from "next/link";
import React from "react";
import "./linkButton.css";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

function LogoutBtn() {
  const router = useRouter();
  const doLogout = () => {
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
    <>
      <button style={{padding: '5px', marginRight: '10px'}} type="button" onClick={()=>{doLogout();}}>Sign out</button>
    </>
  );

}

export default LogoutBtn;