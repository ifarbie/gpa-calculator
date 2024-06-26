import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SemesterContext } from "../../../contexts/SemesterContext";
import Course from "../../../types/Course.type";
import Button from "../../Button";
import CourseInput from "./CourseInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { calculateIPS } from "../../../services/calculate";

type SemesterTableProps = {
  semesterNumber: number;
  id: number;
  updateIPS: (id: number, ips: number, includeInGPA: boolean) => void;
};

type SemesterHeadingProps = {
  id: number;
  semesterNumber: number;
};

const SemesterTable = ({ semesterNumber, id, updateIPS }: SemesterTableProps) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: new Date().getTime(),
      credits: 0,
      gradePoints: null,
      totalGradePoints: null,
    },
    {
      id: new Date().getTime() + 1,
      credits: 0,
      gradePoints: null,
      totalGradePoints: null,
    },
    {
      id: new Date().getTime() + 2,
      credits: 0,
      gradePoints: null,
      totalGradePoints: null,
    },
    {
      id: new Date().getTime() + 3,
      credits: 0,
      gradePoints: null,
      totalGradePoints: null,
    },
  ]);

  const addCourseHandler = () => {
    setCourses([...courses, { id: new Date().getTime(), credits: 0, gradePoints: null, totalGradePoints: null }]);
  };

  const deleteCourseHandler = (id: number) => {
    setCourses(courses.filter((course: Course) => course.id !== id));
  };

  useEffect(() => {
    const totalGradePoints1Semester = courses.reduce((total, course) => {
      if (course.totalGradePoints === null) return total;
      return total + course.totalGradePoints;
    }, 0);
    const totalCredits1Semester = courses.reduce((total, course) => {
      if (course.gradePoints === null) return total;
      return total + course.credits;
    }, 0);
    const ips = calculateIPS(totalGradePoints1Semester, totalCredits1Semester);

    const totalGradePointsIndividuals = courses.reduce((total, course) => {
      if (course.gradePoints === null) return total;
      return total + course.gradePoints;
    }, 0);

    if (totalCredits1Semester === 0 || totalGradePointsIndividuals === 0) {
      if (totalCredits1Semester !== 0 && totalGradePointsIndividuals === 0) {
        updateIPS(id, ips, true);
        return;
      }
      updateIPS(id, ips, false);
      return;
    }
    updateIPS(id, ips, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  return (
    <div>
      <SemesterHeading semesterNumber={semesterNumber} id={id} />
      <div>
        {courses.map((course: Course) => (
          <CourseInput key={course.id} semesterId={id} courses={courses} setCourses={setCourses} id={course.id} deleteCourseHandler={deleteCourseHandler} />
        ))}
      </div>

      <div className="my-3">
        <span>Semester {semesterNumber} GPA: </span>
        <span className="font-semibold">
          {calculateIPS(
            courses.reduce((total, course) => {
              if (course.totalGradePoints === null) return total;
              return total + course.totalGradePoints;
            }, 0),
            courses.reduce((total, course) => {
              if (course.gradePoints === null) return total;
              return total + course.credits;
            }, 0)
          ).toFixed(2)}
        </span>
      </div>
      <Button onClickHandler={addCourseHandler} buttonText="Add Course" marginBottom={2}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <div className="border-b my-4"></div>
    </div>
  );
};

const SemesterHeading = ({ id, semesterNumber }: SemesterHeadingProps) => {
  const { deleteSemester } = useContext(SemesterContext);
  return (
    <div className="flex justify-between mb-4">
      <h2 className="font-semibold text-lg text-[#0d2451] tracking-wider">Semester {semesterNumber}</h2>
      <div className="flex">
        <div className="group border flex items-center border-[#4b5c7e] rounded-full cursor-pointer hover:border-red-500" onClick={() => deleteSemester(id)}>
          <FontAwesomeIcon icon={faXmark} className="text-[#4b5c7e] block w-4 h-4 rounded-full group-hover:text-red-500 px-[0.3rem]" />
        </div>
      </div>
    </div>
  );
};

export default SemesterTable;
