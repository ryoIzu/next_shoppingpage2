import Link from "next/link";
import React from "react";
import "./linkButton.css";


function LinkButton() {
  return(
    <>
    <div id="cart">
      <div className="continueBtn">
        <Link className="linkBtn" href="../"> 買い物を続ける</Link>
      </div>
      <div className="checkoutBtn">
        <Link className="linkBtn"href="../">チェックアウト(未実装)</Link>
      </div>
    </div>
    </>
  );

}

export default LinkButton;