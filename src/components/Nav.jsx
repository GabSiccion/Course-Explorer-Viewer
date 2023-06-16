import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth, coursesCollectionRef } from "../config/Firebase";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import { LoginModal } from "./LoginModal";
import { LoginContext } from "../helper/LoginContext";

export function Nav() {
  const { loginState, setLoginState } = useContext(LoginContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  console.log(loginState.loggedIn);

  function logOut() {
    setLoginState({
      loggedIn: false,
      userName: "",
      userPassword: "",
    });
  }

  function accountNavSection() {
    if (loginState.loggedIn) {
      return (
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <div className="nav-link">{loginState.userName}</div>
            </li>
            <li class="nav-item">
              <div
                className="nav-link"
                onClick={() => {
                  logOut();
                }}
              >
                Logout
              </div>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <button
                class="nav-link btn btn-outline-success"
                onClick={() => {
                  setLoginModalOpen(true);
                }}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      );
    }
  }

  return (
    <>
      {loginModalOpen && <LoginModal loginModalOpen={setLoginModalOpen} />}
      <div class="bg-dark">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark container">
          <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/">
                  <div className="nav-link">Home</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="explorer">
                  <div className="nav-link">Explorer</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="about">
                  <div className="nav-link">About</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="survey">
                  <div className="nav-link">Survey</div>
                </Link>
              </li>
            </ul>
          </div>
          {accountNavSection()}
        </nav>
      </div>
    </>
  );
}
