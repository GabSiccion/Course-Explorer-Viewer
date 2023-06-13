import "../index.css";
import { SelectedCourseContext } from "../helper/SelectedCourseContext";
import { useState } from "react";
import { Courses } from "./Courses";
import { CourseSelection } from "../components/CourseSelection";

export function Explorer() {
  const [selectedCourse, setSelectedCourse] = useState("");
  return (
    <SelectedCourseContext.Provider
      value={{ selectedCourse, setSelectedCourse }}
    >
      <div>
        <CourseSelection />
      </div>
      <div>
        <Courses />
      </div>
    </SelectedCourseContext.Provider>
  );
}
