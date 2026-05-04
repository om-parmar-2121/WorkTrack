import logo from "../../assets/images/StaffSphereLogo.png";
import NavigationList from "./NavigationList";
import ProfileCard from "./ProfileCard";

const Sidebar = ({ isMobileOpen = false }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-72 max-w-[85vw] shrink-0 flex-col border-r border-gray-200 bg-white text-slate-900 shadow-xl transition-transform duration-300 overflow-hidden translate-x-0 md:static md:h-screen md:w-64 md:max-w-none ${
        isMobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
      }`}
    >

      {/* Top Section - Logo & Nav */}
      <div className="flex-1 min-h-0 space-y-6 overflow-y-auto p-5">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <h1 className="text-2xl font-extrabold leading-none tracking-tight md:text-3xl">
            <span className="font-bold bg-linear-to-r from-[#043482] to-[#1f99ec] bg-clip-text text-transparent">
              StaffSphere
            </span>
          </h1>
          <img src={logo} alt="StaffSphere Logo" className="h-12 w-12 object-contain" />
        </div>

        {/* Navigation Items */}
        <NavigationList />
      </div>

      {/* Bottom Section - Profile & Theme */}
      <div className="shrink-0 space-y-3 border-t border-gray-200 p-4">
        {/* Profile Card */}
        <ProfileCard />
      </div>
    </aside>
  );
};

export default Sidebar;
