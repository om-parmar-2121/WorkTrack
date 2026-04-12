import logo from "../../assets/images/StaffSphereLogo.png";
import NavigationList from "./NavigationList";
import ProfileCard from "./ProfileCard";

const Sidebar = ({ isMobileOpen = false }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 max-w-[85vw] shrink-0 flex-col justify-between border-r border-gray-200 bg-white text-slate-900 shadow-xl transition-transform duration-300 md:static md:w-64 md:max-w-none md:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >

      {/* Top Section - Logo & Nav */}
      <div className="space-y-6 p-5">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <h1 className="text-2xl font-extrabold leading-none tracking-tight md:text-3xl">
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
    </aside>
  );
};

export default Sidebar;
