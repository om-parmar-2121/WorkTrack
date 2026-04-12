import { useState, useEffect } from "react";
import HrHeader from "../../components/hr/HrHeader";
import HrNotification from "../../components/hr/HrNotification";
import EmployeeStates from "../../components/hr/EmployeeStates";
import { getPendingLeaveRequests } from "../../services/leaveService";
import { getMyNotifications } from "../../services/notificationService";
import { getEmployees, getPendingEmployees } from "../../services/employeeService";
import { getTodayAttendanceStatus } from "../../services/attendanceService";
import HrResponsiveLayout from "../../components/common/HrResponsiveLayout";

const HrDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingEmployees: 0,
    leavePending: 0,
  });
  const [notifications, setNotifications] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [notificationError, setNotificationError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoadingStats(true);
      setIsLoadingNotifications(true);
      setNotificationError("");

      try {
        const [employeesResponse, pendingEmployeesResult, notificationsResult, todayAttendanceResult, leavePendingResult] =
          await Promise.allSettled([
            getEmployees(),
            getPendingEmployees(),
            getMyNotifications(),
            getTodayAttendanceStatus(),
            getPendingLeaveRequests(),
          ]);

        const employees =
          employeesResponse.status === "fulfilled"
            ? employeesResponse.value || []
            : [];

        const pendingEmployees =
          pendingEmployeesResult.status === "fulfilled"
            ? pendingEmployeesResult.value || []
            : [];

        const pendingLeaves =
          leavePendingResult.status === "fulfilled"
            ? leavePendingResult.value || []
            : [];

        const activeEmployees = employees.filter(
          (employee) => employee?.userId?.status === "active",
        ).length;

        const inactiveEmployees = employees.length - activeEmployees;

        const todayAttendanceMap =
          todayAttendanceResult.status === "fulfilled"
            ? todayAttendanceResult.value || {}
            : {};

        const presentToday = Object.values(todayAttendanceMap).filter(
          (value) => value === "Present",
        ).length;
        const absentToday = Object.values(todayAttendanceMap).filter(
          (value) => value === "Absent",
        ).length;

        setStats({
          totalEmployees: employees.length,
          activeEmployees,
          inactiveEmployees,
          presentToday,
          absentToday,
          pendingEmployees: pendingEmployees.length,
          leavePending: pendingLeaves.length,
        });

        if (notificationsResult.status === "fulfilled") {
          setNotifications(notificationsResult.value || []);
        } else {
          setNotifications([]);
          setNotificationError("Unable to load notifications");
        }
      } catch {
        setStats({
          totalEmployees: 0,
          activeEmployees: 0,
          inactiveEmployees: 0,
          presentToday: 0,
          absentToday: 0,
          pendingEmployees: 0,
          leavePending: 0,
        });
      } finally {
        setIsLoadingStats(false);
        setIsLoadingNotifications(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <HrResponsiveLayout>
      <div className="flex-1 overflow-y-auto p-3 pt-16 md:p-5 md:pt-5">
        {/* Header Section */}
        <HrHeader />

        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 gap-5 pb-5">
            <EmployeeStates stats={stats} isLoading={isLoadingStats} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2">
                <HrNotification
                  notifications={notifications}
                  isLoading={isLoadingNotifications}
                  errorMessage={notificationError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HrResponsiveLayout>
  );
};

export default HrDashboard;
