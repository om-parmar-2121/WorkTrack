import { useEffect, useState } from "react";
import { getMyEmployeeProfile } from "../../services/employeeService";
import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'

const EmpDashboardDetail = () => {
  const [employeeData, setEmployeeData] = useState({
    phone: "-",
    department: "-",
    employeeId: "-",
    gender: "-",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyEmployeeProfile = async () => {
      try {
        setIsLoading(true);
        const employee = await getMyEmployeeProfile();

        if (employee) {
          setEmployeeData({
            phone: employee.phone || "-",
            department: employee.department || "-",
            employeeId: employee.employeeId || "-",
            gender: employee.gender || "-",
          });
        }
      } catch {
        setEmployeeData({
          phone: "-",
          department: "-",
          employeeId: "-",
          gender: "-",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMyEmployeeProfile();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Employee Details</h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <LineWobble
            size="80"
            stroke="5"
            bgOpacity="0.1"
            speed="1.75"
            color="black"
          />
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
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
