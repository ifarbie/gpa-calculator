import student from "../../../assets/student.svg";

const AppHeader = () => {
  return (
    <div className="mt-8 mx-6 md:px-11 md:max-w-[768px] md:flex gap-5">
      <div>
        <h1 className="font-semibold text-3xl mb-2 text-[#0d2451] tracking-wider lg:text-4xl">GPA Calculator</h1>
        <p className="mb-10 text-[#4a5b7d] md:flex-1 lg:text-lg">Calculate your high school, college, and cumulative GPA, check your grades and understand how the GPA scale works.</p>
      </div>
      <div className="hidden w-48 md:block xl:hidden">
        <img src={student} alt="" />
      </div>
    </div>
  );
};

export default AppHeader;
