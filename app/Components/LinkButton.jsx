import Link from "next/link";
import React from "react";
import "./linkButton.css";


function LinkButton() {
  return(
    <>
    <div id="cart">
      <div className="continueBtn">
        <Link className="linkBtn" href="../"> Continue shopping</Link>
      </div>
      <div className="checkoutBtn">
        <Link className="linkBtn"href="../">Check out</Link>
      </div>
    </div>
    </>
  );

}

export default LinkButton;