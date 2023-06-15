import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db, auth, coursesCollectionRef } from "../config/Firebase";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import { LoginModal } from "./LoginModal";

export function Nav() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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
        </nav>
      </div>
    </>
  );
}
