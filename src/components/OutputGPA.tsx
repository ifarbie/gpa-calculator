const OutputGPA = ({ cumulativeGPA }: { cumulativeGPA: number }) => {
  const percentage = Math.round(25 * (cumulativeGPA - 2.0) + 50);
  const percentageWidth = `${percentage}%`;
  console.log(percentageWidth)

  return (
    <div className="h-40 w-40 shadow bg-white border absolute -right-3 -bottom-9 rounded-full p-5 flex justify-center items-center flex-col">
      <div className="font-bold text-3xl text-[#0d2451]">{cumulativeGPA.toFixed(2)}</div>
      <div className="text-[#0d2451]">Cumulative GPA</div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-700">
        <div className={`bg-blue-600 h-1.5 rounded-full dark:bg-blue-500`} style={{ width: percentageWidth }}></div>
      </div>
    </div>
  );
};

export default OutputGPA;
