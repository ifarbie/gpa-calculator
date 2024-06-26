import { createContext, useState } from "react";
import Semester from "../types/Semester.type";

type SemesterContextType = {
  semesters: Semester[];
  addSemester: () => void;
  setSemesters: (semesters: Semester[]) => void;
  deleteSemester: (id: number) => void;
};
const SemesterContext = createContext({} as SemesterContextType);

const SemesterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: new Date().getTime(),
      ips: 0,
      includeInGPA: false,
    },
  ]);
  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: new Date().getTime(),
        ips: 0,
        includeInGPA: false,
      },
    ]);
  };
  const deleteSemester = (id: number) => {
    setSemesters(semesters.filter((semester) => semester.id !== id));
  };
  return <SemesterContext.Provider value={{ semesters, setSemesters, addSemester, deleteSemester }}>{children}</SemesterContext.Provider>;
};

export { SemesterContextProvider, SemesterContext };
