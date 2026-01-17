const HrNotification = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-400 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-400 pb-4">
        Notification
      </h2>
      <div className="space-y-4 text-base">
        <p className="flex items-start gap-3">
          <span className="text-blue-400 font-bold">→</span>
          <span>3 leave approvals are pending</span>
        </p>
        <p className="flex items-start gap-3">
          <span className="text-blue-400 font-bold">→</span>
          <span>2 profile verification is pending</span>
        </p>
      </div>
    </div>
  );
};

export default HrNotification;
