import Navbar from "./components/Layouts/Navbar/Navbar";
import AppHeader from "./components/Layouts/AppHeader/AppHeader";
import student from "./assets/student.svg";
import AppMain from "./components/Layouts/AppMain/AppMain";

const App = () => {
  return (
    <div className="relative max-w-[1300px] mx-auto bg-[#d9f7fa] h-[550px] font-['Barlow'] xl:mt-5 md:rounded-md">
      <header>
        <Navbar />
      </header>
      <main>
        <AppHeader />
        <div className="absolute right-24 top-24 hidden xl:block">
          <img src={student} alt="test" className="h-[400px]" />
        </div>
        <div className="absolute left-1/2 top-[64%] transform -translate-x-1/2 -translate-y-1/2 md:hidden">
          <img src={student} alt="test" className="h-[300px]" />
        </div>
        <AppMain />
      </main>
    </div>
  );
};

export default App;
