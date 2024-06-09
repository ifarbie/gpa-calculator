import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectionBox from "./SelectionBox";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { ChangeEvent } from "react";
import Course from "../types/Course.type";

type CourseInputProps = {
  id: number;
  courses: Course[];
  deleteCourseHandler: (id: number) => void;
  setCourses: (courses: Course[]) => void;
};

const CourseInput = ({ deleteCourseHandler, id, setCourses, courses }: CourseInputProps) => {
  const courseCreditsChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const targetValue = target.value;
    let credits;
    if (targetValue === "") {
      credits = 0;
    } else {
      credits = parseFloat(targetValue);
    }
    setCourses(courses.map((course: Course) => (course.id === id ? { ...course, credits, totalGradePoints: credits * course.gradePoints } : course)));
  };

  const courseGradeChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const gradePoints = parseFloat(e.target.value);
    setCourses(courses.map((course: Course) => (course.id === id ? { ...course, gradePoints, totalGradePoints: course.credits * gradePoints } : course)));
  };

  return (
    <div className="flex justify-between items-center gap-4 mb-3">
      <div className="max-w-[700px] w-full border border-gray-300 rounded-md">
        <div>
          <input type="text" className="placeholder-transition w-full py-2 px-3 focus:outline-none focus:placeholder:text-gray-300 rounded-md placeholder:text-[#848d9c]" placeholder="Course name " />
          <div className="flex">
            <SelectionBox courseGradeChangeHandler={courseGradeChangeHandler}>Grade</SelectionBox>
            <input
              type="number"
              inputMode="numeric"
              className="border-t border-l placeholder-transition w-full py-2 px-3 focus:outline-none focus:placeholder:text-gray-300 rounded-br-md placeholder:text-[#848d9c]"
              placeholder="Credits"
              onChange={courseCreditsChangeHandler}
            />
          </div>
        </div>
      </div>
      <div
        className="border p-[0.2rem] flex items-center justify-center rounded-full cursor-pointer group hover:border-red-500"
        onClick={() => {
          deleteCourseHandler(id);
        }}
      >
        <FontAwesomeIcon icon={faXmark} className="text-gray-400 block w-4 h-4 rounded-full group-hover:text-red-500" />
      </div>
    </div>
  );
};

export default CourseInput;
