import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import SemesterTable from "./components/SemesterTable";
import Header from "./components/Header";
import Semester from "./types/Semester.type";
import OutputGPA from "./components/OutputGPA";
import Button from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import student from "./assets/student.svg"

const App = () => {
  const [cumulativeGPA, setCumulativeGPA] = useState<number>(0);
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: new Date().getTime(),
      ips: 0,
    },
  ]);

  const calculateCumGPA = (totalIps: number, totalSemesters: number) => {
    if (totalSemesters === 0) return 0;
    return totalIps / totalSemesters;
  };

  const addSemesterHandler = () => {
    setSemesters([
      ...semesters,
      {
        id: new Date().getTime(),
        ips: 0,
      },
    ]);
  };

  const deleteSemesterHandler = (id: number) => {
    setSemesters(semesters.filter((semester) => semester.id !== id));
  };

  const updateIPS = (id: number, ips: number) => {
    setSemesters(semesters.map((semester) => (semester.id === id ? { ...semester, ips } : semester)));
  };

  useEffect(() => {
    const totalGPAPerSemester = semesters.reduce((sum, semester) => sum + semester.ips, 0);
    const totalSemesters = semesters.length;
    setCumulativeGPA(calculateCumGPA(totalGPAPerSemester, totalSemesters));
  }, [semesters]);

  return (
    <div className="">
      <div className="relative max-w-[1300px] mx-auto bg-[#d9f7fa] h-[550px] font-['Barlow'] xl:mt-5 md:rounded-md">
        <Navbar />
        <Header />
        {/* SVG */}
        <div className="absolute right-24 top-24 hidden xl:block">
          <img src={student} alt="test" className="h-[400px]"/>
        </div>
        <div className="absolute left-1/2 top-[64%] transform -translate-x-1/2 -translate-y-1/2 md:hidden">
          <img src={student} alt="test" className="h-[300px]"/>
        </div>
        <div className="relative bg-white mx-3 top-48 rounded-lg py-4 px-6 shadow-lg max-w-[768px] md:top-auto md:mx-8">
          {/* Table */}
          <div>
            {semesters.map((semester, index) => (
              <SemesterTable semesterNumber={index + 1} key={semester.id} deleteSemesterHandler={deleteSemesterHandler} id={semester.id} updateIPS={updateIPS} />
            ))}
          </div>
          {/* Output GPA */}
          <OutputGPA cumulativeGPA={cumulativeGPA} />
          <div className="mb-2">
            <Button onClickHandler={addSemesterHandler} buttonText="Add Semester">
              <FontAwesomeIcon icon={faSquarePlus} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
