import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

type SemesterHeadingProps = {
  id: number;
  semesterNumber: number;
  deleteSemesterHandler: (id: number) => void;
};

const SemesterHeading = ({ id, semesterNumber, deleteSemesterHandler }: SemesterHeadingProps) => {
  return (
    <div className="flex justify-between mb-4">
      <h2 className="font-semibold text-lg text-[#0d2451] tracking-wider">Semester {semesterNumber}</h2>
      <div className="flex gap-3">
        <div className="flex gap-2"></div>
        <div className="group border flex items-center border-[#4b5c7e] rounded-full cursor-pointer hover:border-red-500" onClick={() => deleteSemesterHandler(id)}>
          <FontAwesomeIcon icon={faXmark} className="text-[#4b5c7e] block w-4 h-4 rounded-full group-hover:text-red-500 px-[0.3rem]" />
        </div>
      </div>
    </div>
  );
};

export default SemesterHeading;
