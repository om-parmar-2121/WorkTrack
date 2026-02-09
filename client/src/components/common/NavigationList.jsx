import { LayoutDashboard, ContactRound, CalendarCheck, Stamp } from 'lucide-react';


const NavigationList = () => {
  return (
    <div className="space-y-1">
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600">
          <LayoutDashboard />
          <span className="tracking-wide">Dashboard</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600">
          <ContactRound />
          <span className="tracking-wide">Employee</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600">
          <CalendarCheck />
          <span className="tracking-wide">Attendance</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600">
          <Stamp />
          <span className="tracking-wide">Approvals</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationList;
