import Sidebar from "../../components/Sidebar";
import EmployeeDetailLeftBLock from "../../components/employee/EmployeeDetailLeftBLock";
import EmployeeDetailRightBlock from "../../components/employee/EmployeeDetailRightBlock";

const EmployeeDetails = () => {
  return (
    <div className="flex bg-gray-300 h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-4">
        <div className="mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Employee Details
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Grid */}
          <EmployeeDetailLeftBLock />

          {/* Right Grid */}
          <EmployeeDetailRightBlock />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;