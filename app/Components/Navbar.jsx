'use client';
import Link from "next/link";
import React from "react";
import "./navbar.css";
import { useAuth } from "../context/authContext";
import Logout from "./LogoutBtn";

function Navbar() {
  const {currentUser} = useAuth();

  return(
    <>
      <div id="navbar">
        <div className="links">
          <Link href="/">Shop</Link>
          <Link href="/cart">Cart</Link>
          {currentUser ? 
          (
            <>
            <p className="right-align">{currentUser.email}</p>
            <Logout />
            </>
          ): (
            <>
            <Link className="right-align" href="/login">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </>
  );

}

export default Navbar;