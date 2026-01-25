const EmpLeaveReqCards = ({leaveRequests}) => {
  return (
    <div className="space-y-4">
      {leaveRequests.map((leave) => (
        <div
          key={leave.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-all"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-semibold text-lg">
                {leave.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{leave.name}</p>
              <p className="text-sm text-gray-500">{leave.email}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                <span className="font-medium">{leave.reason}</span>
                <span className="text-gray-400">•</span>
                <span>
                  {leave.from} to {leave.to}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors">
              Approve
            </button>
            <button className="px-5 py-2 bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpLeaveReqCards;
