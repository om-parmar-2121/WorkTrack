import { LogOut } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className="flex items-center gap-3 rounded-lg">
      <img
        alt="Profile avatar"
        className="h-12 w-12 rounded-full border-2 border-indigo-500 object-cover"
        src="https://i.pravatar.cc/150?img=12"
      />
      <button className="flex-1 flex justify-center items-center rounded-lg border border-red-200 text-red-600 bg-red-50 px-4 py-2.5 text-sm font-semibold hover:bg-red-100 transition-colors gap-2 hover:border-red-400">
        <span>Log Out</span>
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ProfileCard;
