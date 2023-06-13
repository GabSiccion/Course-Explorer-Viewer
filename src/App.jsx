import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Route, Routes } from "react-router-dom";
import { Survey } from "./pages/Survey";
import { Nav } from "./components/Nav";
import { useState } from "react";
import { Explorer } from "./pages/Explorer";

function App() {
  const [selectedCourse, setSelectedCourse] = useState("");
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explorer" element={<Explorer />} />
        <Route path="about" element={<About />} />
        <Route path="survey" element={<Survey />} />
      </Routes>
    </>
  );
}

export default App;
