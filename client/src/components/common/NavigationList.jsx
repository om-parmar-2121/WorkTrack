import { LayoutDashboard, ContactRound, CalendarCheck, Stamp } from "lucide-react";
import { NavLink } from "react-router-dom";


const NavigationList = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 text-[#0752A2] md:px-4 md:text-base ${
      isActive
        ? "bg-blue-50"
        : "hover:bg-blue-50"
    }`;

  return (
    <div className="space-y-1">
      <NavLink to="/hr/dashboard" className={linkClasses}>
        <LayoutDashboard />
        <span className="tracking-wide">Dashboard</span>
      </NavLink>
      <NavLink to="/hr/employees" className={linkClasses}>
        <ContactRound />
        <span className="tracking-wide">Employee</span>
      </NavLink>
      <NavLink to="/hr/attendance" className={linkClasses}>
        <CalendarCheck />
        <span className="tracking-wide">Attendance</span>
      </NavLink>
      <NavLink to="/hr/approval" className={linkClasses}>
        <Stamp />
        <span className="tracking-wide">Approvals</span>
      </NavLink>
    </div>
  );
};

export default NavigationList;
