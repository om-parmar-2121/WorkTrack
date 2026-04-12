import EmployeeTable from "../../components/hr/EmployeeTable";
import HrResponsiveLayout from "../../components/common/HrResponsiveLayout";

const EmployeeList = () => {
  return (
    <HrResponsiveLayout>
      <div className="flex h-screen w-full flex-col overflow-hidden p-3 pt-16 md:p-3 md:pt-3">
        {/* Employee Header */}
        <div className="rounded p-3 text-blue-900 md:h-25 md:p-5">
          <p className="text-2xl font-bold md:text-3xl">Employee List</p>
          <p>Manage your employee here</p>
        </div>

        {/* Employee List */}
        <div className="min-h-0 flex-1">
          <EmployeeTable />
        </div>
      </div>
    </HrResponsiveLayout>
  );
};

export default EmployeeList;