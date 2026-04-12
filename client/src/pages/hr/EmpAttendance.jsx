import EmpAttendList from "../../components/hr/EmpAttendList";
import HrResponsiveLayout from "../../components/common/HrResponsiveLayout";

const EmpAttendance = () => {
  return (
    <HrResponsiveLayout>
      <div className="flex h-screen flex-1 flex-col gap-3 overflow-hidden p-3 pt-16 md:p-3 md:pt-3">
        <div className="mb-3">
          <h2 className="m-0 text-lg font-semibold md:text-xl">Daily Employee Attendance</h2>
        </div>

        <div className="min-h-0 flex-1">
          <EmpAttendList />
        </div>
      </div>
    </HrResponsiveLayout>
  );
};

export default EmpAttendance;
