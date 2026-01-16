import { SunMedium, Moon } from 'lucide-react';

const SidebarThemeToggle = () => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3 transition-all duration-200 hover:bg-slate-200">
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700">
          Theme
        </span>
      </div>
      <div className="flex items-center gap-1">
        <SunMedium className="h-4 w-4 text-amber-" />
        <button
          className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-300 transition-all duration-200 hover:shadow-md"
          type="button"
        >
          <span className="inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 translate-x-1" />
        </button>
        <Moon className="h-4 w-4 text-slate-600" />
      </div>
    </div>
  );
};

export default SidebarThemeToggle;
