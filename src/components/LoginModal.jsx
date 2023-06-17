import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../helper/LoginContext";
import { Button } from "react-bootstrap";
import "./LoginModal.css";

export function LoginModal({ loginModalOpen }) {
  const { loginState, setLoginState } = useContext(LoginContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerModal, setRegsiterModal] = useState(false);

  useEffect(() => {
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    const fieldCollection = document.getElementsByTagName("input");
    const fieldArray = Array.from(fieldCollection);
    fieldArray.map((field) => {
      field.value = "";
    });
    console.log(fieldArray);
  }, [registerModal]);

  const registerUser = async () => {
    if (!(userName === "" || password === "" || confirmPassword === "")) {
      if (password.length > 5) {
        if (userName.length > 5) {
          if (password === confirmPassword) {
            const sameEmailsQuery = query(
              collection(db, "users"),
              where("userName", "==", userName)
            );
            const sameEmails = await getDocs(sameEmailsQuery);
            if (sameEmails.empty) {
              await addDoc(collection(db, "users"), {
                userName: userName,
                userPassword: password,
                role: "user",
                scores: [],
              });
              setRegsiterModal(false);
              alert("account registered");
            } else alert("Entered username already registered");
          } else alert("passwords do not match");
        } else alert("username length must be 6 or longer");
      } else {
        alert("password length must be 6 or longer");
        console.log(password.length);
      }
    } else {
      alert("all fields must be filled");
      console.log(`${userName}${password}${confirmPassword}`);
    }
  };

  const loginUser = async () => {
    if (!(userName === "" || password === "")) {
      const userQuery = query(
        collection(db, "users"),
        where("userName", "==", userName),
        where("userPassword", "==", password)
      );
      const User = await getDocs(userQuery);
      if (!User.empty) {
        setLoginState({
          loggedIn: true,
          userName: userName,
          userPassword: password,
        });
        loginModalOpen(false);
        alert("Successfully Logged In");
      } else {
        alert("Incorrect credentials");
      }
    } else {
      alert("All fields must be filled");
    }
  };

  if (!registerModal) {
    return (
      <div className="login-modal-background">
        <div className="login-modal-container">
          <div className="close-button">
            <button
              onClick={() => {
                loginModalOpen(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <p className="fs-1">LOGIN</p>
          </div>
          <div className="body">
            <div>
              <p>Username:</p>
              <input
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div>
              <p>Password:</p>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="footer">
            <Button variant="success" onClick={loginUser}>
              Login
            </Button>
            <a
              onClick={() => {
                setRegsiterModal(true);
              }}
            >
              Register new account
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login-modal-background">
        <div className="login-modal-container">
          <div className="close-button">
            <button
              onClick={() => {
                loginModalOpen(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <p className="fs-1">Create Account</p>
          </div>
          <div className="body">
            <div>
              <p>Username:</p>
              <input
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div>
              <p>Password: </p>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <p>Confirm Password:</p>
              <input
                placeholder=" Confirm Password"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="footer">
            <Button variant="success" onClick={registerUser}>
              Register Account
            </Button>
            <a
              onClick={() => {
                setRegsiterModal(false);
              }}
            >
              Go back to Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}
