import Course from "../types/Course.type";
import Button from "./Button";
import CourseInput from "./CourseInput";
import SemesterHeading from "./SemesterHeading";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type SemesterTableProps = {
  semesterNumber: number;
  deleteSemesterHandler: (id: number) => void;
  id: number;
  updateIPS: (id: number, ips: number) => void;
};

const SemesterTable = ({ semesterNumber, deleteSemesterHandler, id, updateIPS }: SemesterTableProps) => {
  const [courses, setCourses] = useState<Course[]>([{ id: new Date().getTime(), credits: 0, gradePoints: 0, totalGradePoints: 0 }]);

  const calculateIPS = (totalGradePoints1Semester: number, totalCredits1Semester: number) => {
    if (totalCredits1Semester === 0) return 0;
    return totalGradePoints1Semester / totalCredits1Semester;
  };

  useEffect(() => {
    const totalCredits1Semester = courses.reduce((total, course) => total + course.credits, 0);
    const totalGradePoints1Semester = courses.reduce((total, course) => total + course.totalGradePoints, 0);
    const ips = calculateIPS(totalGradePoints1Semester, totalCredits1Semester);

    updateIPS(id, ips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const addCourseHandler = () => {
    setCourses([...courses, { id: new Date().getTime(), credits: 0, gradePoints: 0, totalGradePoints: 0 }]);
  };

  const deleteCourseHandler = (id: number) => {
    setCourses(courses.filter((course: Course) => course.id !== id));
  };

  return (
    <div>
      <SemesterHeading semesterNumber={semesterNumber} deleteSemesterHandler={deleteSemesterHandler} id={id} />
      <div>
        {courses.map((course: Course) => (
          <CourseInput key={course.id} courses={courses} setCourses={setCourses} id={course.id} deleteCourseHandler={deleteCourseHandler} />
        ))}
      </div>

      <div className="my-3">
        <span>Semester {semesterNumber} GPA: </span>
        <span className="font-semibold">
          {calculateIPS(
            courses.reduce((total, course) => total + course.totalGradePoints, 0),
            courses.reduce((total, course) => total + course.credits, 0)
          ).toFixed(2)}
        </span>
      </div>
      <div className="mb-2">
        <Button onClickHandler={addCourseHandler} buttonText="Add Course">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <div className="border-b my-4"></div>
    </div>
  );
};

export default SemesterTable;
