import logo from "../assets/images/WorkTrackLogo.png";
import NavigationList from "./NavigationList";
import ProfileCard from "./ProfileCard";
import SidebarThemeToggle from "./SidebarThemeToggle";

const Sidebar = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex h-screen w-[15%] flex-col justify-between text-slate-900 shadow-2xl shadow-slate-900/20">

        {/* Top Section - Logo & Nav */}
        <div className="space-y-6 p-4">
          {/* Logo */}
          <div className="flex items-center justify-center p-2">
            <img src={logo} alt="Company Logo" className="h-full" />
          </div>

          {/* Navigation Items */}
          <NavigationList />
        </div>

        {/* Bottom Section - Profile & Theme */}
        <div className="space-y-2 px-3 py-3 border-slate-200">
          {/* Profile Card */}
          <ProfileCard />

          {/* Theme Toggle Card */}
          <SidebarThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
