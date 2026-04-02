import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString();
};

const EmpLeaveReqCards = ({
  leaveRequests,
  isLoading,
  errorMessage,
  processingId,
  onApprove,
  onReject,
}) => {
  if (isLoading) {
    return <div className="flex items-center justify-center py-10">
              <LineWobble
                size="80"
                stroke="5"
                bgOpacity="0.1"
                speed="1.75"
                color="black"
              />
           </div>
  }

  if (errorMessage) {
    return <p className="text-sm text-red-600">{errorMessage}</p>;
  }

  if (leaveRequests.length === 0) {
    return <p className="text-sm text-gray-500">No pending leave requests.</p>;
  }

  return (
    <div className="space-y-4">
      {leaveRequests.map((leave) => (
        <div
          key={leave._id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-all"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-semibold text-lg">
                {leave.employeeId?.fullName?.charAt(0) || "E"}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{leave.employeeId?.fullName || "-"}</p>
              <p className="text-sm text-gray-500">{leave.employeeId?.userId?.email || "-"}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                <span className="font-medium">{leave.reason || "-"}</span>
                <span className="text-gray-400">•</span>
                <span>
                  {formatDate(leave.startDate)} to {formatDate(leave.endDate)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={processingId === leave._id}
              onClick={() => onApprove(leave._id)}
              className="px-5 py-2 bg-green-100 text-green-900 border-2 border-green-300 hover:bg-green-200 text-sm font-medium rounded-lg transition-colors disabled:bg-green-300"
            >
              {processingId === leave._id ? "Approving..." : "Approve"}
            </button>
            <button
              type="button"
              disabled={processingId === leave._id}
              onClick={() => onReject(leave._id)}
              className="px-5 py-2 bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-lg border-2 border-gray-200 transition-colors disabled:text-gray-400"
            >
              {processingId === leave._id ? "Rejecting..." : "Reject"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpLeaveReqCards;
