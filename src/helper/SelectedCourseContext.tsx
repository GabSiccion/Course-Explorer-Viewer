import { createContext } from "react";

interface SelectedCourseContextInterface {
  selectedCourse: string | null;
  selectedCourseName: string | null;
  setSelectedCourse: (newValue: string) => void;
  setSelectedCourseName: (newValue: string) => void;
}

export const SelectedCourseContext =
  createContext<SelectedCourseContextInterface>({
    selectedCourse: null,
    selectedCourseName: null,
    setSelectedCourse: () => undefined,
    setSelectedCourseName: () => undefined,
  });
