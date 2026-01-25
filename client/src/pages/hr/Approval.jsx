import EmpLeaveReq from "../../components/hr/EmpLeaveReq";
import NewEmpReq from "../../components/hr/NewEmpReq";
import Sidebar from "../../components/Sidebar";

const Approval = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="p-5 bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-900">Approval Center</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage pending approvals
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* New Employee Request */}
          <NewEmpReq />

          {/* Employee Leave Requests */}
          <EmpLeaveReq />
        </div>
      </div>
    </div>
  );
};

export default Approval;