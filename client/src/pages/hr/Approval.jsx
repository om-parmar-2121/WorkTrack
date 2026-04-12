import EmpLeaveReq from "../../components/hr/EmpLeaveReq";
import NewEmpReq from "../../components/hr/NewEmpReq";
import HrResponsiveLayout from "../../components/common/HrResponsiveLayout";

const Approval = () => {
  return (
    <HrResponsiveLayout>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-gray-50 p-3 pt-16 md:p-5 md:pt-5">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Approval Center</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage pending approvals
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-6">
          {/* New Employee Request */}
          <NewEmpReq />

          {/* Employee Leave Requests */}
          <EmpLeaveReq />
        </div>
      </div>
    </HrResponsiveLayout>
  );
};

export default Approval;