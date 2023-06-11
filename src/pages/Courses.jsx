import { useContext, useEffect, useState } from "react";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import { db, auth } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { CourseSelection } from "../components/CourseSelection";

export function Courses() {
  const { selectedCourse, setSelectedCourse } = useContext(
    SelectedCourseContext
  );
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const getCourseData = async () => {
      const courseData = await getDoc(doc(db, "courses", selectedCourse));
      if (courseData.data != undefined) {
        setCourseData(courseData.data());
        console.log(courseData.courseTracks);
      } else {
        console.log("no data");
      }
    };
    getCourseData();
  }, [selectedCourse]);

  if (selectedCourse === "" || Object.keys(courseData).length === 0) {
    return (
      <>
        <div>
          <CourseSelection />
        </div>
        <div className="course-content-wrapper mt-4 container">
          <p className="course-name fs-4">Select a course to edit.</p>
        </div>
      </>
    );
  } else {
    const Array = () => {
      let tracks = courseData.courseTracks.map((track) => {
        let topics = track.trackTopics.map((topic) => {
          return (
            <div className="card m-1">
              <div className="card-body">
                <p className="card-title fw-bold">{topic.topicName}</p>
                <p className="card-text">{topic.topicText}</p>
                <a
                  className="btn btn-success"
                  role="button"
                  href={topic.topicURL}
                >
                  View topics and lessons
                </a>
              </div>
            </div>
          );
        });
        let careers = track.trackCareers.map((career) => {
          return (
            <div className="career-card">
              <p className="career-name">{career.careerName}</p>
              <p>{career.careerText}</p>
              <p>
                <span className="career-salary">{career.careerSalary}</span>
              </p>
            </div>
          );
        });
        return (
          <div className="track-container">
            <h2>{track.trackName}</h2>
            <p>{track.trackText}</p>
            <h3>Track Topics</h3>
            <div className="card-container overflow-auto mb-4">{topics}</div>
            <h3>Career Options</h3>
            <div className="career-container mb-4">{careers}</div>
          </div>
        );
      });
      return tracks;
    };

    return (
      <>
        <div>
          <CourseSelection />
        </div>
        <div className="jumbotron">
          <div className="container">
            <h1>{courseData.courseName}</h1>
          </div>
        </div>
        <div className="course-container container pt-4">
          <p>{courseData.courseTexts}</p>
          <div className="track-container">{Array()}</div>
        </div>
      </>
    );
  }
}
