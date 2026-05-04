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

  const handleEmployeeDeleted = (deletedEmployee) => {
    if (!deletedEmployee?._id) return;

    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => String(employee._id) !== String(deletedEmployee._id)),
    );

    setSelectedEmployee(null);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-3 md:p-5">
      <div className="hidden min-h-0 flex-1 overflow-auto md:block">
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

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto md:hidden">
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

        {!isLoading && errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-600 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && !errorMessage && employees.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-gray-500 font-medium">
            No employees found.
          </div>
        ) : null}

        {!isLoading && !errorMessage && employees.map((emp) => (
          <div key={emp._id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-gray-900">{emp.fullName || "-"}</p>
                <p className="text-xs text-gray-600 break-all">{emp?.userId?.email || "-"}</p>
                <p className="text-xs text-gray-600">ID: {emp.employeeId || "-"}</p>
                <p className="text-xs text-gray-600">Department: {emp.department || "-"}</p>
                <p className="text-xs text-gray-600">Designation: {emp.position || "-"}</p>
              </div>
              <button
                type="button"
                onClick={() => handleEditClick(emp)}
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
              >
                <SquarePen size={16} />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEmployee ? (
        <EmployeeEditModal
          employee={selectedEmployee}
          onClose={handleCloseModal}
          onSaved={handleEmployeeUpdated}
          onDeleted={handleEmployeeDeleted}
        />
      ) : null}
    </div>
  );
};

export default EmployeeTable;