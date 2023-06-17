import { db, auth, coursesCollectionRef } from "../config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function CourseSelection() {
  const {
    selectedCourse,
    setSelectedCourse,
    selectedCourseName,
    setSelectedCourseName,
  } = useContext(SelectedCourseContext);

  const selectCourse = (e) => {
    setSelectedCourse(e.target.getAttribute("course-key"));
    setSelectedCourseName(e.target.getAttribute("value"));
  };

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        onSnapshot(coursesCollectionRef, (doc) => {
          const data = doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setCourseList(data);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getCourseList();
  }, []);

  const courseButtons = () =>
    courseList.map((course) => {
      const { courseName, id } = course;
      return (
        <Button
          className="col-2 m-1"
          variant="success"
          type="button"
          key={id}
          course-key={id}
          value={courseName}
          onClick={(e) => selectCourse(e)}
        >
          {courseName ? courseName : "No name"}
        </Button>
      );
    });

  return (
    <div>
      <div className="course-selection-rail">{courseButtons()}</div>
    </div>
  );
}
