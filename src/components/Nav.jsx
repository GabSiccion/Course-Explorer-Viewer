import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { db, auth, coursesCollectionRef } from "../config/Firebase";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";

export function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light" id="nav">
      <div className="container">
        <a href="#" className="navbar-brand mb-0 h1">
          CourseExplorer
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/">
                <div className="nav-link">Home</div>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="explorer">
                <div className="nav-link">Explorer</div>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="about">
                <div className="nav-link">About</div>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="survey">
                <div className="nav-link">Survey</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
