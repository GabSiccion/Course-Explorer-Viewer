import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Route, Routes } from "react-router-dom";
import { Survey } from "./pages/Survey";
import { Nav } from "./components/Nav";
import { SelectedCourseContext } from "./helper/SelectedCourseContext";
import { useState } from "react";
import { Courses } from "./pages/Courses";

function App() {
  const [selectedCourse, setSelectedCourse] = useState("");
  return (
    <>
      <SelectedCourseContext.Provider
        value={{ selectedCourse, setSelectedCourse }}
      >
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="about" element={<About />} />
          <Route path="survey" element={<Survey />} />
        </Routes>
      </SelectedCourseContext.Provider>
    </>
  );
}

export default App;
