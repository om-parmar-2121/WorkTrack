import EmpAttendHeading from "../../components/hr/EmpAttendHeading";
import EmpAttendList from "../../components/hr/EmpAttendList";
import Sidebar from "../../components/Sidebar";

const EmpAttendance = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <Sidebar />
      <div className="w-full p-3 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="m-0 text-xl font-semibold">
              Daily Employee Attendance -
            </h2>
            <span className="inline-block rounded-full text-md">
              2026-01-12
            </span>
          </div>

          <EmpAttendHeading />

          <EmpAttendList />
        </div>
      </div>
    </div>
  );
};

export default EmpAttendance;
