const EmployeeDetailRightBlock = () => {
  const employeeData = {
    fullName: "Om Parmar",
    gender: "Male",
    birthdate: "1995-06-20",
    email: "omparmar2105@gmail.com",
    phone: "+91 9876543210",
    workplace: "Headquarters",
    address: "123 Tech Street, Innovation Park, City - 123456",
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-md p-5 h-full">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-gray-800">Personal Data</h3>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Full Name </label>
            <p className="mt-2 text-gray-800 font-medium">{employeeData.fullName}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Gender </label>
              <p className="mt-2 text-gray-800 font-medium"> {employeeData.gender}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Birthdate </label>
              <p className="mt-2 text-gray-800 font-medium">{employeeData.birthdate}</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Email </label>
            <p className="mt-2 text-gray-800 font-medium">{employeeData.email}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Phone </label>
              <p className="mt-2 text-gray-800 font-medium">{employeeData.phone}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Workplace </label>
              <p className="mt-2 text-gray-800 font-medium">{employeeData.workplace}</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide"> Address </label>
            <p className="mt-2 text-gray-800 font-medium whitespace-pre-wrap">{employeeData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailRightBlock;
