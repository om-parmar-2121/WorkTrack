import { Edit2 } from "lucide-react";

const EmployeeDetailLeftBLock = () => {
  const employeeData = {
    role: "Junior Developer",
    department: "Development",
    employeeId: "EMP001",
    dateOfJoining: "2022-01-15"
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
        <div className="relative group flex justify-center">
          <div className="w-30 h-30 aspect-square rounded-lg flex items-center justify-center relative overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Employee"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Edit2 className="h-3 w-3 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {employeeData.fullName}
          </h2>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Role
            </label>
            <div className="flex items-center justify-between mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
              <span className="text-gray-800 font-medium">
                {employeeData.role}
              </span>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Edit2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Department
            </label>
            <div className="flex items-center justify-between mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
              <span className="text-gray-800 font-medium">
                {employeeData.department}
              </span>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Edit2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Employee ID
            </label>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-800 font-medium">
                {employeeData.employeeId}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Date of Joining
            </label>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-800 font-medium">21-01-2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailLeftBLock;
