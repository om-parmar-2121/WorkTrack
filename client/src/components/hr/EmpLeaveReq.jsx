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
      <div className="border-b border-gray-200 bg-linear-to-r from-green-100 to-white px-4 py-4 md:px-6">
        <h2 className="text-xl font-semibold text-gray-800">Leave Requests</h2>
        <p className="text-xs text-gray-500 mt-1">
          {leaveRequests.length} pending
        </p>
      </div>
      <div className="max-h-75 overflow-y-scroll p-4 md:p-6">
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