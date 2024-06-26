export const calculateIPS = (totalGradePoints1Semester: number, totalCredits1Semester: number) => {
  if (totalCredits1Semester === 0) return 0;
  return totalGradePoints1Semester / totalCredits1Semester;
};

export const calculateCumGPA = (totalIps: number, totalSemesters: number) => {
  if (totalSemesters === 0) return 0;
  return totalIps / totalSemesters;
};
