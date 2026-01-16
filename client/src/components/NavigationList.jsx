import { LayoutDashboard, ContactRound, CalendarCheck, Stamp } from 'lucide-react';


const NavigationList = () => {
  return (
    <div className="space-y-2">
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded px-3 py-3 text-m font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm hover:text-black">
          <LayoutDashboard />
          <span className="tracking-wide">Dashboard</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded px-3 py-3 text-m font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm hover:text-black">
          <ContactRound />
          <span className="tracking-wide">Employee</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded px-3 py-3 text-m font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm hover:text-black">
          <CalendarCheck />
          <span className="tracking-wide">Attendance</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded px-3 py-3 text-m font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm hover:text-black">
          <Stamp />
          <span className="tracking-wide">Approvals</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationList;
