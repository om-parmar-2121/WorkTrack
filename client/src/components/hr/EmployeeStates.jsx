const EmployeeStates = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-400 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-400 pb-4">
        Employee States
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {/* Total Employee */}
        <div className="border-r border-blue-300 pr-4">
          <h3 className="text-sm font-semibold mb-3">Total Employee</h3>
          <p className="text-4xl font-bold text-start">128</p>
        </div>

        {/* Active/Inactive */}
        <div className="border-r border-blue-300 px-4">
          <h3 className="text-sm font-semibold mb-3"> Status </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm">
                <span className="font-semibold">Active:</span> 122
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Inactive:</span> 6
              </p>
            </div>
          </div>
        </div>

        {/* Present/Absent */}
        <div className="pl-4">
          <h3 className="text-sm font-semibold mb-3"> Attendance </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm">
                <span className="font-semibold">Present:</span> 115
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Absent:</span> 7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStates;
