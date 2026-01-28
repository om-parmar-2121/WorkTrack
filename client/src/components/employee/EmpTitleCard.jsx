import Background from "../../assets/images/HrNameBackground.jpg";
const employeeData = {
    name: "John Doe",
    email: "johndoe@worktrack.com"
  };

const EmpTitleCard = ({ onApplyLeave }) => {
  return (
    <div
        className="rounded-xl shadow-lg p-6 mb-5 flex justify-between items-center mx-6 mt-6"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt=""
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              {employeeData.name} <span className="text-4xl">👋</span>
            </h1>
            <p className="text-lg text-indigo-100">{employeeData.email}</p>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={onApplyLeave}
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-2 px-6 rounded-md transition-colors text-sm"
          >
            + Apply for Leave
          </button>
        </div>
      </div>
  );
};

export default EmpTitleCard;