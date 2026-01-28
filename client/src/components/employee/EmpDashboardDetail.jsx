const employeeData = {
    phone: "+91 9876543210",
    department: "Development",
    employeeId: "EMP001",
    gender: "Male",
  };

const EmpDashboardDetail = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Employee Details</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="text-gray-600 font-medium">Department</label>
          <p className="text-gray-900 mt-1">{employeeData.department}</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Employee ID</label>
          <p className="text-gray-900 mt-1">{employeeData.employeeId}</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Phone</label>
          <p className="text-gray-900 mt-1">{employeeData.phone}</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Gender</label>
          <p className="text-gray-900 mt-1">{employeeData.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboardDetail;
