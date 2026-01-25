import EmpLeaveReqCards from "./EmpLeaveReqCards";

const EmpLeaveReq = () => {
  const leaveRequests = [
    {
      id: 1,
      name: "Om Parmar",
      email: "om.parmar@company.com",
      reason: "Personal Leave",
      from: "2025-08-17",
      to: "2025-08-18",
    },
    {
      id: 2,
      name: "Riya Sharma",
      email: "riya.sharma@company.com",
      reason: "Medical Leave",
      from: "2025-08-19",
      to: "2025-08-21",
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman.verma@company.com",
      reason: "Vacation",
      from: "2025-08-22",
      to: "2025-08-28",
    },
    {
      id: 4,
      name: "Neha Patel",
      email: "neha.patel@company.com",
      reason: "Family Emergency",
      from: "2025-08-20",
      to: "2025-08-20",
    },
    {
      id: 5,
      name: "Rahul Mehta",
      email: "rahul.mehta@company.com",
      reason: "Work From Home",
      from: "2025-08-23",
      to: "2025-08-23",
    },
    {
      id: 6,
      name: "Sneha Iyer",
      email: "sneha.iyer@company.com",
      reason: "Maternity Leave",
      from: "2025-08-01",
      to: "2025-10-31",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-100 to-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Leave Requests</h2>
        <p className="text-xs text-gray-500 mt-1">
          {leaveRequests.length} pending
        </p>
      </div>
      <div className="p-6 overflow-y-scroll max-h-[300px]">
        <EmpLeaveReqCards leaveRequests = {leaveRequests} />
      </div>
    </div>
  );
};

export default EmpLeaveReq;