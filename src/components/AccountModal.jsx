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

  const accountRecommendation = () => {
    if (scores.length > 0) {
      let recommendation = scores[0];
      let value = scores[0]["score"];

      scores.map((score) => {
        if (score["score"] > value) {
          recommendation = structuredClone(score);
        }
      });

      return (
        <>
          <p className="mt-4 fs-5 my-1">Best Scoring track</p>
          <p className="mb-1">Course: {recommendation["course"]}</p>
          <p className="mb-1">
            highest scoring track: {recommendation["recommendation"]}
          </p>
          <p className="mb-1">Score: {recommendation["score"]}%</p>
        </>
      );
    } else {
      return <p>Haven't answered yet</p>;
    }
  };

  const accountScores = () => {
    let scoresArray = scores.map((score) => {
      return (
        <div className="bg-success text-white p-2 my-2 rounded-1">
          <p className="mb-1">Course: {score["course"]}</p>
          <p className="mb-1">
            highest scoring track: {score["recommendation"]}
          </p>
          <p className="mb-1">Score: {score["score"]}%</p>
        </div>
      );
    });
    return scoresArray;
  };

  const accountDetails = () => {
    return (
      <>
        <p className="mb-1">Username: {loginState["userName"]}</p>
        <p className="mb-1">Name: {loginState["name"]}</p>
        <p className="mb-1">Gender: {loginState["gender"]}</p>
        <p className="mb-1">School: {loginState["school"]}</p>
      </>
    );
  };

  return (
    <div className="login-modal-background">
      <div className="account-modal-container">
        <div className="account-modal-body">
          <button
            className="float-end"
            onClick={() => {
              accountModalOpen(false);
            }}
          >
            X
          </button>
          <div className="mb-4">
            <h3>Account Details</h3>
            {accountDetails()}
            {accountRecommendation()}
          </div>
          <h3>Scores</h3>
          <div className="scores-div">{accountScores()}</div>
        </div>
      </div>
    </div>
  );
}
