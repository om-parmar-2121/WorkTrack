import { useEffect, useMemo, useState } from "react";
import LeaveApplicationForm from "../../components/employee/LeaveApplicationForm";
import EmpTitleCard from "../../components/employee/EmpTitleCard";
import EmpNotification from "../../components/employee/EmpNotification";
import EmpDashboardDetail from "../../components/employee/EmpDashboardDetail";
import LeaveOverview from "../../components/employee/LeaveOverview";
import RecentLeaveActivity from "../../components/employee/RecentLeaveActivity";
import { getMyLeaveRequests } from "../../services/leaveService";

const EmpDashboard = () => {
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoadingLeaves, setIsLoadingLeaves] = useState(true);

  useEffect(() => {
    const loadLeaveRequests = async () => {
      try {
        setIsLoadingLeaves(true);
        const leaveRequestsList = await getMyLeaveRequests();
        setLeaveRequests(leaveRequestsList);
      } catch (error) {
        if (error.message?.toLowerCase().includes("no leave requests found")) {
          setLeaveRequests([]);
          return;
        }

        setLeaveRequests([]);
      } finally {
        setIsLoadingLeaves(false);
      }
    };

    loadLeaveRequests();
  }, []);

  const leaveStats = useMemo(() => {
    return leaveRequests.reduce(
      (acc, leave) => {
        const normalizedStatus = (leave?.status || "").toLowerCase();
        acc.total += 1;

        if (normalizedStatus === "approved") acc.approved += 1;
        if (normalizedStatus === "pending") acc.pending += 1;
        if (normalizedStatus === "rejected") acc.rejected += 1;

        return acc;
      },
      { total: 0, approved: 0, pending: 0, rejected: 0 },
    );
  }, [leaveRequests]);

  const recentLeaves = useMemo(
    () => [...leaveRequests].slice(0, 3),
    [leaveRequests],
  );

  const statCards = [
    {
      title: "Total Requests",
      value: leaveStats.total,
      tone: "text-blue-700 border-2 border-blue-200",
    },
    {
      title: "Approved",
      value: leaveStats.approved,
      tone: "text-emerald-700 border-2 border-emerald-200",
    },
    {
      title: "Pending",
      value: leaveStats.pending,
      tone: "text-amber-700 border-2 border-amber-200",
    },
    {
      title: "Rejected",
      value: leaveStats.rejected,
      tone: "text-rose-700 border-2 border-rose-200",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden flex flex-col">
      <EmpTitleCard />

      <div className="flex-1 overflow-hidden px-3 pb-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <div className="xl:col-span-4 space-y-4">
              <EmpDashboardDetail />

              <RecentLeaveActivity
                isLoadingLeaves={isLoadingLeaves}
                recentLeaves={recentLeaves}
              />
            </div>

            <div className="xl:col-span-8 space-y-4">
              <LeaveOverview
                statCards={statCards}
                onNewLeave={() => setShowLeaveForm(true)}
              />

              <div>
              <EmpNotification />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLeaveForm && (
        <LeaveApplicationForm onClose={() => setShowLeaveForm(false)} />
      )}
    </div>
  );
};

export default EmpDashboard;