import { useState } from "react";
import Calander from "../../components/Calander";
import LeaveApplicationForm from "../../components/employee/LeaveApplicationForm";
import EmpTitleCard from "../../components/employee/EmpTitleCard";
import EmpNotification from "../../components/employee/EmpNotification";
import EmpDashboardDetail from "../../components/employee/EmpDashboardDetail";

const EmpDashboard = () => {
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const leaveStats = {
    total: 20,
    used: 8,
    pending: 2,
    remaining: 10,
  };

  const attendanceData = {
    totalWorkingDays: 22,
    present: 18,
    absent: 4,
  };

  return (
    <div className="bg-gray-50 h-screen overflow-hidden flex flex-col">
      <EmpTitleCard onApplyLeave={() => setShowLeaveForm(true)} />

      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full p-6">
          <div className="grid grid-cols-2 gap-6 h-full">
            
            {/* Left Block */}
            <div className="flex flex-col gap-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {/* Notification Section */}
              <EmpNotification />

              {/* Employee Details */}
              <EmpDashboardDetail />

              {/* Leave Data*/}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Leave Summary</h2>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <label className="text-gray-600 font-medium">Total</label>
                    <p className="text-gray-900 mt-1 text-xl font-bold">{leaveStats.total}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">Remaining</label>
                    <p className="text-gray-900 mt-1 text-xl font-bold">{leaveStats.remaining}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">Used</label>
                    <p className="text-gray-900 mt-1 text-xl font-bold">{leaveStats.used}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">Pending</label>
                    <p className="text-gray-900 mt-1 text-xl font-bold">{leaveStats.pending}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 overflow-hidden">

              {/* Calendar */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex-1 overflow-hidden">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Calendar</h2>
                <Calander />
              </div>

              {/* Attendance Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Attendance Summary:</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Working Days:</span>
                    <span className="font-bold text-gray-900">{attendanceData.totalWorkingDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Present:</span>
                    <span className="font-bold text-green-600">{attendanceData.present}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Absent:</span>
                    <span className="font-bold text-red-600">{attendanceData.absent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Form */}
      {showLeaveForm && (
        <LeaveApplicationForm onClose={() => setShowLeaveForm(false)} />
      )}
    </div>
  );
};

export default EmpDashboard;