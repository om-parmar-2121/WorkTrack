import { LineWobble } from "ldrs/react";
import "ldrs/react/LineWobble.css";

const RecentLeaveActivity = ({ isLoadingLeaves, recentLeaves }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Leave Activity</h2>
        {isLoadingLeaves ? (
          <span className="text-xs font-semibold text-blue-600">Loading...</span>
        ) : (
          <span className="text-xs font-semibold text-gray-500">Last {Math.min(recentLeaves.length, 3)} updates</span>
        )}
      </div>

      {isLoadingLeaves ? (
        <div className="flex items-center justify-center py-10">
          <LineWobble
            size="80"
            stroke="5"
            bgOpacity="0.1"
            speed="1.75"
            color="black"
          />
        </div>
      ) : recentLeaves.length ? (
        <div className="space-y-3">
          {recentLeaves.map((leave) => {
            const status = (leave?.status || "pending").toLowerCase();
            const statusStyle =
              status === "approved"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : status === "rejected"
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-amber-50 text-amber-700 border-amber-200";

            return (
              <div key={leave._id} className="flex items-start justify-between gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{leave.reason || "Leave request"}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-md border capitalize ${statusStyle}`}>
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No leave requests yet. Use "Apply for Leave" to submit your first request.</p>
      )}
    </div>
  );
};

export default RecentLeaveActivity;
