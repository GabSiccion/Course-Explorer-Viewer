import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../helper/LoginContext";
import { Button } from "react-bootstrap";
import "./AccountModal.css";

export function AccountModal({ accountModalOpen }) {
  const { loginState, setLoginState } = useContext(LoginContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function getScores() {
      let newArray = [];
      let accountScoresQuery = query(
        collection(db, "scores"),
        where("userName", "==", loginState["userName"])
      );
      let accountScores = await getDocs(accountScoresQuery);
      accountScores.forEach((doc) => {
        newArray.push(doc.data());
      });
      setScores(newArray.slice());
    }
    getScores();
    console.log(scores);
  }, []);

  const accountScores = () => {
    let scoresArray = scores.map((score) => {
      return (
        <>
          <p className="mb-1">Course: {score["course"]}</p>
          <p className="mb-1">Recommendation: {score["recommendation"]}</p>
          <p className="mb-1">Score: {score["score"]}</p>
        </>
      );
    });
    return scoresArray;
  };

  const accountDetails = () => {
    return (
      <>
        <p className="mb-1">Name: {loginState["name"]}</p>
        <p className="mb-1">Gender: {loginState["gender"]}</p>
        <p className="mb-1">School: {loginState["school"]}</p>
      </>
    );
  };

  const loginDetails = () => {
    return (
      <>
        <p className="mb-1">Username: {loginState["userName"]}</p>
        <p className="mb-1">Password: {loginState["userPassword"]}</p>
      </>
    );
  };

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
          <h3>Account Details</h3>
          <div className="mb-4">{accountDetails()}</div>
          <h3>Login Details</h3>
          <div className="mb-4">{loginDetails()}</div>
          <h3>Scores</h3>
          <div className="mb-4">{accountScores()}</div>
        </div>
      </div>
    </div>
  );
}
