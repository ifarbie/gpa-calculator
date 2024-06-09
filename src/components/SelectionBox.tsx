import { ChangeEvent } from "react";

const listLetter = ["", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];

type SelectionBoxProps = {
  children: string;
  courseGradeChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectionBox = ({ children, courseGradeChangeHandler }: SelectionBoxProps) => {
  return (
    <select id="grades" className="border-t text-[#848d9c] block w-full p-1.5 focus:outline-none rounded-bl-md" onChange={courseGradeChangeHandler}>
      {listLetter.map((letter) => {
        let gradePoints;
        switch (letter) {
          case "A":
            gradePoints = 4.0;
            break;
          case "A-":
            gradePoints = 3.7;
            break;
          case "B+":
            gradePoints = 3.3;
            break;
          case "B":
            gradePoints = 3;
            break;
          case "B-":
            gradePoints = 2.7;
            break;
          case "C+":
            gradePoints = 2.3;
            break;
          case "C":
            gradePoints = 2;
            break;
          case "C-":
            gradePoints = 1.7;
            break;
          case "D":
            gradePoints = 1;
            break;
          default:
            gradePoints = 0;
            break;
        }
        return (
          <option key={letter} hidden={letter === ""} value={gradePoints}>
            {letter === "" ? children : letter}
          </option>
        );
      })}
    </select>
  );
};

export default SelectionBox;
