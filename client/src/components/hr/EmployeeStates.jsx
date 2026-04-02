import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'

const EmployeeStates = ({ stats, isLoading }) => {
  const safeStats = stats || {
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingEmployees: 0,
    leavePending: 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <LineWobble
          size="80"
          stroke="5"
          bgOpacity="0.1"
          speed="1.75"
          color="black"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      <div className="bg-white border-2 border-blue-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Total Employees</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.totalEmployees}</p>
        <p className="text-xs text-gray-500 mt-1">Total workforce</p>
      </div>

      <div className="bg-white border-2 border-emerald-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">Active</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.activeEmployees}</p>
        <p className="text-xs text-gray-500 mt-1">Active status</p>
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">Inactive</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.inactiveEmployees}</p>
        <p className="text-xs text-gray-500 mt-1">Inactive status</p>
      </div>

      <div className="bg-white border-2 border-teal-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-teal-600 font-semibold">Present</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.presentToday}</p>
        <p className="text-xs text-gray-500 mt-1">Marked present</p>
      </div>

      <div className="bg-white border-2 border-rose-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-rose-600 font-semibold">Absent</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.absentToday}</p>
        <p className="text-xs text-gray-500 mt-1">Marked absent</p>
      </div>

      <div className="bg-white border-2 border-amber-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-amber-600 font-semibold">Approvals</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.pendingEmployees}</p>
        <p className="text-xs text-gray-500 mt-1">Pending approval</p>
      </div>

      <div className="bg-white border-2 border-orange-200 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">Leave</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{safeStats.leavePending}</p>
        <p className="text-xs text-gray-500 mt-1">Pending leaves</p>
      </div>
    </div>
  );
};

export default EmployeeStates;
