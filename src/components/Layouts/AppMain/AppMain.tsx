import { useContext, useEffect, useState } from "react";
import SemesterTable from "../../Fragments/SemesterTable/SemesterTable";
import OutputGPA from "./OutputGPA";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { SemesterContext } from "../../../contexts/SemesterContext";
import { calculateCumGPA } from "../../../services/calculate";

const AppMain = () => {
  const { semesters, setSemesters, addSemester } = useContext(SemesterContext);
  const [cumulativeGPA, setCumulativeGPA] = useState<number>(0);

  const updateIPS = (id: number, ips: number, includeInGPA: boolean) => {
    setSemesters(semesters.map((semester) => (semester.id === id ? { ...semester, ips, includeInGPA } : semester)));
  };

  useEffect(() => {
    const totalGPAPerSemester = semesters.reduce((total, semester) => (semester.includeInGPA ? total + semester.ips : total), 0);
    const totalSemesters = semesters.filter((semester) => semester.includeInGPA).length;
    setCumulativeGPA(calculateCumGPA(totalGPAPerSemester, totalSemesters));
  }, [semesters]);

  return (
    <div className="relative bg-white mx-3 top-48 rounded-lg py-4 px-6 shadow-lg max-w-[768px] md:top-auto md:mx-8">
      {/* Table */}
      <div>
        {semesters.map((semester, index) => (
          <SemesterTable semesterNumber={index + 1} key={semester.id} id={semester.id} updateIPS={updateIPS} />
        ))}
      </div>
      {/* Output GPA */}
      <OutputGPA cumulativeGPA={cumulativeGPA} />
      {/* Add Semester Button */}
      <Button onClickHandler={addSemester} buttonText="Add Semester" marginBottom={2}>
        <FontAwesomeIcon icon={faSquarePlus} />
      </Button>
    </div>
  );
};

export default AppMain;
