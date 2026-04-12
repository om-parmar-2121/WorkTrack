const HrNotification = ({ notifications, isLoading, errorMessage }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 flex-1 flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Notification:</h2>
      <div className="flex-1 bg-gray-50 rounded p-4 text-gray-600 text-sm">
        {isLoading ? (
          <p>Loading notifications...</p>
        ) : errorMessage ? (
          <p className="text-red-600">{errorMessage}</p>
        ) : notifications?.length ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <p key={notification._id}>{notification.message}</p>
            ))}
          </div>
        ) : (
          <p>No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default HrNotification;
