import logo from "../../assets/images/StaffSphereLogo.png";
import NavigationList from "./NavigationList";
import ProfileCard from "./ProfileCard";

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 shrink-0 flex-col justify-between bg-white text-slate-900 shadow-xl border-r border-gray-200">

      {/* Top Section - Logo & Nav */}
      <div className="space-y-6 p-5">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <h1 className="text-3xl font-extrabold leading-none tracking-tight">
            <span className="font-bold bg-gradient-to-r from-[#043482] to-[#1f99ec] bg-clip-text text-transparent">
              StaffSphere
            </span>
          </h1>
          <img src={logo} alt="StaffSphere Logo" className="h-12 w-12 object-contain" />
        </div>

        {/* Navigation Items */}
        <NavigationList />
      </div>

      {/* Bottom Section - Profile & Theme */}
      <div className="space-y-3 p-4 border-t border-gray-200">
        {/* Profile Card */}
        <ProfileCard />
      </div>
    </div>
  );
};

export default Sidebar;
