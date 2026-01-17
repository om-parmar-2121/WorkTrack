import Sidebar from "../../components/Sidebar";
import HrHeader from "../../components/hr/HrHeader";
import Calander from "../../components/Calander";
import HrNotification from "../../components/hr/HrNotification";
import EmployeeStates from "../../components/hr/EmployeeStates";

const HrDashboard = () => {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-5">
        {/* Header Section */}
        <HrHeader />

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Employee States */}
          <EmployeeStates />

          {/* Calendar */}
          <Calander />

          {/* Bottom Left: Notification */}
          <HrNotification />
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
