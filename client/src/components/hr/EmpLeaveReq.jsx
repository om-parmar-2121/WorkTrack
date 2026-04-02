import { useEffect, useState } from "react";
import {
  approveLeaveRequest,
  getPendingLeaveRequests,
  rejectLeaveRequest,
} from "../../services/leaveService";
import EmpLeaveReqCards from "./EmpLeaveReqCards";

const EmpLeaveReq = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [processingId, setProcessingId] = useState("");

  const loadPendingLeaves = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const leaveRequestsList = await getPendingLeaveRequests();
      setLeaveRequests(leaveRequestsList);
    } catch (error) {
      if (error.message?.toLowerCase().includes("no pending leave requests")) {
        setLeaveRequests([]);
        return;
      }

      setErrorMessage(error.message || "Failed to fetch leave requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingLeaves();
  }, []);

  const handleApprove = async (leaveId) => {
    try {
      setProcessingId(leaveId);
      await approveLeaveRequest(leaveId);
      await loadPendingLeaves();
    } catch (error) {
      setErrorMessage(error.message || "Failed to approve leave request");
    } finally {
      setProcessingId("");
    }
  };

  const handleReject = async (leaveId) => {
    try {
      setProcessingId(leaveId);
      await rejectLeaveRequest(leaveId);
      await loadPendingLeaves();
    } catch (error) {
      setErrorMessage(error.message || "Failed to reject leave request");
    } finally {
      setProcessingId("");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-linear-to-r from-green-100 to-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Leave Requests</h2>
        <p className="text-xs text-gray-500 mt-1">
          {leaveRequests.length} pending
        </p>
      </div>
      <div className="p-6 overflow-y-scroll max-h-75">
        <EmpLeaveReqCards
          leaveRequests={leaveRequests}
          isLoading={isLoading}
          errorMessage={errorMessage}
          processingId={processingId}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default EmpLeaveReq;