import { useEffect, useState } from "react";
import { approveUser } from "../../services/authService";
import { deleteEmployee, getPendingEmployees } from "../../services/employeeService";
import NewEmpReqCard from "./NewEmpReqCards";

const NewEmpReq = () => {
  const [newEmployees, setNewEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [processingId, setProcessingId] = useState("");

  const loadPendingEmployees = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const pendingEmployees = await getPendingEmployees();
      setNewEmployees(pendingEmployees);
    } catch (error) {
      if (error.message?.toLowerCase().includes("no pending employees")) {
        setNewEmployees([]);
        return;
      }

      setErrorMessage(error.message || "Failed to fetch pending employees");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingEmployees();
  }, []);

  const handleApprove = async (userId) => {
    try {
      setProcessingId(userId);
      await approveUser(userId);
      await loadPendingEmployees();
    } catch (error) {
      setErrorMessage(error.message || "Failed to approve employee");
    } finally {
      setProcessingId("");
    }
  };

  const handleDecline = async (employeeDocId) => {
    try {
      setProcessingId(employeeDocId);
      await deleteEmployee(employeeDocId);
      await loadPendingEmployees();
    } catch (error) {
      setErrorMessage(error.message || "Failed to decline employee");
    } finally {
      setProcessingId("");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-linear-to-r from-blue-100 to-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          New Employee Requests
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {newEmployees.length} pending
        </p>
      </div>
      <div className="p-6 overflow-y-scroll max-h-75">
        <NewEmpReqCard
          newEmployees={newEmployees}
          isLoading={isLoading}
          errorMessage={errorMessage}
          processingId={processingId}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      </div>
    </div>
  );
};

export default NewEmpReq;
