import Sidebar from "../../components/Sidebar";
import EmployeeTable from "../../components/hr/EmployeeTable";

const EmployeeList = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <Sidebar />
      <div className="w-full p-3 flex flex-col gap-3">
        {/* Employee Header */}
        <div className="h-25 bg-blue-100 rounded p-5 border border-blue-400 text-blue-900">
          <p className="text-2xl font-semibold">Employee List</p>
          <p>Manage your employee here</p>
        </div>

        {/* Employee List */}
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeList;