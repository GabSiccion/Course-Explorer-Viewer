import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../helper/LoginContext";
import { Button } from "react-bootstrap";
import "./AccountModal.css";

export function AccountModal({ accountModalOpen }) {
  const { loginState, setLoginState } = useContext(LoginContext);
  const { scores, setScores } = useState([]);

  useEffect(() => {
    async function getScores() {
      let accountScoresQuery = query(
        collection(db, "scores"),
        where("userName", "==", loginState["userName"])
      );
      let accountScores = await getDocs(accountScoresQuery);
      accountScores.forEach((doc) => {
        console.log(doc.data());
      });
    }
    getScores();
  });

  return (
    <div className="login-modal-background">
      <div className="account-modal-container">
        <div className="account-modal-body">
          <button
            onClick={() => {
              accountModalOpen(false);
            }}
          >
            X
          </button>
          <h1>ACCOUNT THINGS</h1>
        </div>
      </div>
    </div>
  );
}
