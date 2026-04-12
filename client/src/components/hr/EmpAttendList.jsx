import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import { getTodayAttendanceStatus, markAttendance } from "../../services/attendanceService";
import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'

const EmpAttendList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markedAttendance, setMarkedAttendance] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [todayDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchEmployeesAndTodayStatus = async () => {
      try {
        setLoading(true);
        const [employeeResponse, todayResponse] = await Promise.all([
          getEmployees(),
          getTodayAttendanceStatus(),
        ]);

        setEmployees(employeeResponse || []);
        setMarkedAttendance(todayResponse || {});
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch employees");
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeesAndTodayStatus();
  }, []);

  const handleMarkAttendance = async (employeeId, status) => {
    if (markedAttendance[employeeId]) {
      alert("Attendance already marked for today.");
      return;
    }

    try {
      setIsSubmitting((prev) => ({ ...prev, [employeeId]: true }));
      
      const response = await markAttendance({
        employeeId,
        status,
        date: todayDate,
      });

      setMarkedAttendance((prev) => ({
        ...prev,
        [employeeId]: response?.attendance?.status || status,
      }));
    } catch (err) {
      console.error("Failed to mark attendance:", err);
      alert(`Error marking ${status}: ${err.message}`);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [employeeId]: false }));
    }
  };

  const isAttendanceMarked = (employeeId) => {
    return Boolean(markedAttendance[employeeId]);
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-center items-center py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm md:p-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700">
          Today's Date: <span className="text-blue-600">{new Date(todayDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </p>
      </div>
      <div className="hidden min-h-0 flex-1 overflow-y-auto no-scrollbar md:block">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                Employee Name
              </th>
              <th className="w-1/4 px-4 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                Department
              </th>
              <th className="w-1/4 px-4 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                ID
              </th>
              <th className="w-1/4 px-4 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((elem, index) => {
              const isMarked = isAttendanceMarked(elem.employeeId);
              const markedStatus = markedAttendance[elem.employeeId];
              
              return (
                <tr key={`${elem.employeeId}-${index}`}>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {elem.fullName}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {elem.department}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {elem.employeeId}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {isMarked ? (
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1.5 border-2 rounded-md text-sm font-semibold cursor-not-allowed ${
                            markedStatus === "Present"
                              ? "bg-green-50 border-green-300 text-green-400"
                              : "bg-red-50 border-red-300 text-red-400"
                          }`}
                        >
                          Marked ✓
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isSubmitting[elem.employeeId]}
                          onClick={() => handleMarkAttendance(elem.employeeId, "Present")}
                          className="rounded-md border-2 border-green-200 bg-green-100 px-3 py-1.5 font-semibold text-green-800 transition hover:bg-green-200 disabled:opacity-70"
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          disabled={isSubmitting[elem.employeeId]}
                          onClick={() => handleMarkAttendance(elem.employeeId, "Absent")}
                          className="rounded-md border-2 border-red-200 bg-red-100 px-3 py-1.5 font-semibold text-red-800 transition hover:bg-red-200 disabled:opacity-70"
                        >
                          Absent
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto md:hidden">
        {employees.map((elem, index) => {
          const isMarked = isAttendanceMarked(elem.employeeId);
          const markedStatus = markedAttendance[elem.employeeId];

          return (
            <div key={`${elem.employeeId}-${index}`} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{elem.fullName}</p>
                  <p className="mt-1 text-xs text-gray-600">Department: {elem.department}</p>
                  <p className="text-xs text-gray-600">ID: {elem.employeeId}</p>
                </div>

                {isMarked ? (
                  <div
                    className={`inline-flex w-24 shrink-0 items-center justify-center rounded-md border-2 px-2 py-1.5 text-xs font-semibold cursor-not-allowed ${
                      markedStatus === "Present"
                        ? "bg-green-50 border-green-300 text-green-500"
                        : "bg-red-50 border-red-300 text-red-500"
                    }`}
                  >
                    Marked ✓
                  </div>
                ) : (
                  <div className="grid grid-cols-1 justify-items-stretch gap-2">
                    <button
                      type="button"
                      disabled={isSubmitting[elem.employeeId]}
                      onClick={() => handleMarkAttendance(elem.employeeId, "Present")}
                      className="w-24 rounded-md border-2 border-green-200 bg-green-100 px-2 py-1.5 text-center text-xs font-semibold text-green-800 transition hover:bg-green-200 disabled:opacity-70"
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting[elem.employeeId]}
                      onClick={() => handleMarkAttendance(elem.employeeId, "Absent")}
                      className="w-24 rounded-md border-2 border-red-200 bg-red-100 px-2 py-1.5 text-center text-xs font-semibold text-red-800 transition hover:bg-red-200 disabled:opacity-70"
                    >
                      Absent
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmpAttendList;
