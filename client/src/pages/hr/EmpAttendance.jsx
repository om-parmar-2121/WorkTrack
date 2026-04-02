import EmpAttendList from "../../components/hr/EmpAttendList";
import Sidebar from "../../components/common/Sidebar";

const EmpAttendance = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div>
          <div className="mb-3">
            <h2 className="m-0 text-xl font-semibold">Daily Employee Attendance</h2>
          </div>

          <EmpAttendList />
        </div>
      </div>
    </div>
  );
};

export default EmpAttendance;
