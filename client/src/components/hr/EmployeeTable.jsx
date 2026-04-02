import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { getEmployees } from "../../services/employeeService";
import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'
import EmployeeEditModal from "./EmployeeEditModal";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");

    getEmployees()
      .then((employeesList) => {
        setEmployees(employeesList || []);
      })
      .catch((error) => {
        if (error?.message === "No employees found") {
          setEmployees([]);
          return;
        }

        setErrorMessage(error?.message || "Unable to load employees");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleEmployeeUpdated = (updatedEmployee) => {
    if (!updatedEmployee?._id) return;

    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => {
        if (String(employee._id) !== String(updatedEmployee._id)) {
          return employee;
        }

        return {
          ...employee,
          position: updatedEmployee.position ?? employee.position,
          department: updatedEmployee.department ?? employee.department,
          workplace: updatedEmployee.workplace ?? employee.workplace,
        };
      }),
    );

    setSelectedEmployee((prevSelected) => {
      if (!prevSelected || String(prevSelected._id) !== String(updatedEmployee._id)) {
        return prevSelected;
      }

      return {
        ...prevSelected,
        position: updatedEmployee.position ?? prevSelected.position,
        department: updatedEmployee.department ?? prevSelected.department,
        workplace: updatedEmployee.workplace ?? prevSelected.workplace,
      };
    });
  };

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-50 border-b border-blue-300">
            <th className="text-left px-4 py-3 font-semibold text-blue-900">Name</th>
            <th className="text-left px-4 py-3 font-semibold text-blue-900">ID</th>
            <th className="text-left px-4 py-3 font-semibold text-blue-900">Email</th>
            <th className="text-left px-4 py-3 font-semibold text-blue-900">Department</th>
            <th className="text-left px-4 py-3 font-semibold text-blue-900">Designation</th>
            <th className="text-left px-4 py-3 font-semibold text-blue-900">Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6}>
                <div className="flex items-center justify-center py-10">
                  <LineWobble
                    size="80"
                    stroke="5"
                    bgOpacity="0.1"
                    speed="1.75"
                    color="black"
                  />
                </div>
              </td>
            </tr>
          )}

          {!isLoading && errorMessage && (
            <tr>
              <td colSpan={6} className="px-4 py-4 text-center text-red-600 font-medium">
                {errorMessage}
              </td>
            </tr>
          )}

          {!isLoading && !errorMessage && employees.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-4 text-center text-gray-500 font-medium">
                No employees found.
              </td>
            </tr>
          )}

          {!isLoading && !errorMessage && employees.map((emp) => {
            return (
              <tr
                key={emp._id}
                className="transition-colors border-b border-gray-300"
              >
                <td className="px-4 py-3 text-gray-700">{emp.fullName || "-"}</td>
                <td className="px-4 py-3 text-gray-700">{emp.employeeId || "-"}</td>
                <td className="px-4 py-3 text-gray-700">{emp?.userId?.email || "-"}</td>
                <td className="px-4 py-3 text-gray-700">{emp.department}</td>
                <td className="px-4 py-3 text-gray-700">{emp.position}</td>
                <td className="px-4 py-3">
                  <SquarePen
                    className="cursor-pointer text-gray-700 hover:text-gray-9 00 transition-colors"
                    size={18}
                    onClick={() => handleEditClick(emp)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      {selectedEmployee ? (
        <EmployeeEditModal
          employee={selectedEmployee}
          onClose={handleCloseModal}
          onSaved={handleEmployeeUpdated}
        />
      ) : null}
    </div>
  );
};

export default EmployeeTable;