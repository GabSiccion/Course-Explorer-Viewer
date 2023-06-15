import { useState } from "react";
import { Button } from "react-bootstrap";
import "./LoginModal.css";

export function LoginModal({ loginModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerModal, setRegsiterModal] = useState(false);

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
            <h1>LOGIN</h1>
          </div>
          <div className="body">
            <div>
              <p>Email Address:</p>
              <input
                placeholder="Email"
                type="email"
                name="email"
                onBlur={(e) => {
                  setEmail(e.current.value);
                  console.log(email);
                }}
              />
            </div>
            <div>
              <p>Password:</p>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onBlur={(e) => {
                  setPassword(e.current.value);
                  console.log(password);
                }}
              />
            </div>
          </div>
          <div className="footer">
            <Button variant="success">Login</Button>
            <Button
              variant="warning"
              onClick={() => {
                setRegsiterModal(true);
              }}
            >
              Register new account
            </Button>
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
              <input
                placeholder="Email"
                type="email"
                name="email"
                onBlur={(e) => {
                  setEmail(e.current.value);
                  console.log(email);
                }}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onBlur={(e) => {
                  setPassword(e.current.value);
                  console.log(password);
                }}
              />
            </div>
            <div>
              <input
                placeholder=" Confirm Password"
                type="password"
                name="password"
                onBlur={(e) => {
                  setPassword(e.current.value);
                  console.log(password);
                }}
              />
            </div>
          </div>
          <div className="footer">
            <Button variant="success">Register Account</Button>
            <Button
              variant="warning"
              onClick={() => {
                setRegsiterModal(false);
              }}
            >
              Go back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
