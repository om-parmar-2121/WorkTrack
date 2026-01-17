import Background from "../../assets/images/HrNameBackground.jpg";

const HrHeader = () => {
  return (
    <div
      className="rounded-xl shadow-lg p-5 mb-5 flex justify-between items-center"
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
          className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold leading-tight"
        />
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            Om Parmar <span className="text-4xl">👋</span>
          </h1>
          <p className="text-lg text-indigo-100">omparmar2105@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default HrHeader;
