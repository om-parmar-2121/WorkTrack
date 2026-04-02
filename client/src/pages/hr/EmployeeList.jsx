import Sidebar from "../../components/common/Sidebar";
import EmployeeTable from "../../components/hr/EmployeeTable";

const EmployeeList = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <Sidebar />
      <div className="w-full p-3 flex flex-col">
        {/* Employee Header */}
        <div className="h-25 rounded p-5 text-blue-900">
          <p className="text-3xl font-bold">Employee List</p>
          <p>Manage your employee here</p>
        </div>

        {/* Employee List */}
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeList;