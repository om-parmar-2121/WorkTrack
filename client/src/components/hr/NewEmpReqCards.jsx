const NewEmpReqCard = ({ newEmployees }) => {
  return (
    <div className="space-y-4">
      {newEmployees.map((employee) => (
        <div
          key={employee.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-lg">
                {employee.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{employee.name}</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {employee.role}
                </span>
              </div>
              <p className="text-sm text-gray-500">{employee.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Joined: {employee.dateOfLogin}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              Accept
            </button>
            <button className="px-5 py-2 bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors">
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewEmpReqCard;
