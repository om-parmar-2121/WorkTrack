import NewEmpReqCard from "./NewEmpReqCards";

const NewEmpReq = () => {
  const newEmployees = [
    {
      id: 1,
      name: "Om Parmar",
      email: "om.parmar@company.com",
      dateOfLogin: "17-08-2025",
      role: "HR",
    },
    {
      id: 2,
      name: "Riya Sharma",
      email: "riya.sharma@company.com",
      dateOfLogin: "18-08-2025",
      role: "Employee",
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman.verma@company.com",
      dateOfLogin: "18-08-2025",
      role: "Employee",
    },
    {
      id: 4,
      name: "Neha Patel",
      email: "neha.patel@company.com",
      dateOfLogin: "19-08-2025",
      role: "HR",
    },
    {
      id: 5,
      name: "Rahul Mehta",
      email: "rahul.mehta@company.com",
      dateOfLogin: "19-08-2025",
      role: "Employee",
    },
    {
      id: 6,
      name: "Sneha Iyer",
      email: "sneha.iyer@company.com",
      dateOfLogin: "20-08-2025",
      role: "Employee",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-100 to-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          New Employee Requests
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {newEmployees.length} pending
        </p>
      </div>
      <div className="p-6 overflow-y-scroll max-h-[300px]">
        <NewEmpReqCard newEmployees = {newEmployees} />
      </div>
    </div>
  );
};

export default NewEmpReq;
