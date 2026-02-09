import logo from "../assets/images/WorkTrackLogo.png";
import NavigationList from "./NavigationList";
import ProfileCard from "./ProfileCard";
import SidebarThemeToggle from "./SidebarThemeToggle";

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col justify-between bg-white text-slate-900 shadow-xl border-r border-gray-200">

      {/* Top Section - Logo & Nav */}
      <div className="space-y-6 p-5">
        {/* Logo */}
        <div className="flex items-center justify-center py-4">
            <img src={logo} alt="Company Logo" className="h-full" />
          </div>

        {/* Navigation Items */}
        <NavigationList />
      </div>

      {/* Bottom Section - Profile & Theme */}
      <div className="space-y-3 p-4 border-t border-gray-200">
        {/* Profile Card */}
        <ProfileCard />

        {/* Theme Toggle Card */}
        <SidebarThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
