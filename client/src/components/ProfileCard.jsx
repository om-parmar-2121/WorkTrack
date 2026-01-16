import { LogOut } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className="flex items-center justify-between gap-5 rounded-lg">
      <img
        alt="Profile avatar"
        className="h-10 w-10 rounded-full border-2 border-blue-700 object-cover"
        src="https://i.pravatar.cc/150?img=12"
      />
      <button className="flex-1 flex justify-center items-center rounded-lg border border-slate-100 text-red-600 bg-slate-50 px-5 py-3 text-md font-semibold hover:bg-red-100 transition-colors gap-5 hover:border-red-600">
        <span>Log Out</span>
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ProfileCard;
