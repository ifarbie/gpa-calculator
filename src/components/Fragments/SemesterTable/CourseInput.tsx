import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { ChangeEvent, useContext } from "react";
import gradeLists from "../../../constants/gradeLists";
import Course from "../../../types/Course.type";
import { SemesterContext } from "../../../contexts/SemesterContext";

type CourseInputProps = {
  id: number;
  courses: Course[];
  deleteCourseHandler: (id: number) => void;
  setCourses: (courses: Course[]) => void;
  semesterId: number;
};

type GradeSelectionBoxProps = {
  children: string;
  courseGradeChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
};

type DeleteCourseButtonProps = {
  onClick: () => void;
};

type CreditInputBoxProps = {
  courseCreditsChangeHandler: ({ target }: ChangeEvent<HTMLInputElement>) => void;
};

const CourseInput = ({ deleteCourseHandler, id, setCourses, courses, semesterId }: CourseInputProps) => {
  const { semesters, setSemesters } = useContext(SemesterContext);

  const courseCreditsChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const targetValue = target.value;
    let credits: number;
    if (targetValue === "") {
      credits = 0;
      if (courses.length < 2) {
        setSemesters(semesters.map((semester) => (semester.id === semesterId ? { ...semester, includeInGPA: false } : semester)));
        setCourses(
          courses.map((course: Course) => {
            if (course.gradePoints === null) return { ...course, credits };
            return course.id === id ? { ...course, credits, totalGradePoints: credits * course.gradePoints } : course;
          })
        );
        return;
      }
    } else {
      credits = parseFloat(targetValue);
    }
    setCourses(
      courses.map((course: Course) => {
        if (course.gradePoints === null) return { ...course, credits };
        return course.id === id ? { ...course, credits, totalGradePoints: credits * course.gradePoints } : course;
      })
    );
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
            <GradeSelectionBox courseGradeChangeHandler={courseGradeChangeHandler}>Grade</GradeSelectionBox>
            <CreditInputBox courseCreditsChangeHandler={courseCreditsChangeHandler} />
          </div>
        </div>
      </div>
      <DeleteCourseButton
        onClick={() => {
          deleteCourseHandler(id);
        }}
      />
    </div>
  );
};

export const DeleteCourseButton = ({ onClick }: DeleteCourseButtonProps) => {
  return (
    <div className="border p-[0.2rem] flex items-center justify-center rounded-full cursor-pointer group hover:border-red-500" onClick={onClick}>
      <FontAwesomeIcon icon={faXmark} className="text-gray-400 block w-4 h-4 rounded-full group-hover:text-red-500" />
    </div>
  );
};

export const GradeSelectionBox = ({ children, courseGradeChangeHandler }: GradeSelectionBoxProps) => {
  return (
    <select id="grades" className="border-t text-[#848d9c] block w-full p-1.5 focus:outline-none rounded-bl-md" onChange={courseGradeChangeHandler}>
      {gradeLists.map((grade) => (
        <option key={grade.letter} hidden={grade.letter === ""} value={grade.points}>
          {grade.letter === "" ? children : grade.letter}
        </option>
      ))}
    </select>
  );
};

export const CreditInputBox = ({ courseCreditsChangeHandler }: CreditInputBoxProps) => {
  return (
    <input
      type="number"
      inputMode="numeric"
      className="border-t border-l placeholder-transition w-full py-2 px-3 focus:outline-none focus:placeholder:text-gray-300 rounded-br-md placeholder:text-[#848d9c]"
      placeholder="Credits"
      onChange={courseCreditsChangeHandler}
    />
  );
};

export default CourseInput;
