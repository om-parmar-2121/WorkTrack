const EmpAttenHeading = () => {
  const summary = { total: 18, present: 10, late: 2, absent: 4, leave: 2 };
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-4">
      <div className="flex gap-2 flex-wrap">
        <span className="inline-block px-2.5 py-1.5 rounded-full text-xs bg-blue-50 text-blue-900 border border-blue-300">
          Total: {summary.total}
        </span>
        <span className="inline-block px-2.5 py-1.5 rounded-full text-xs bg-green-50 text-green-900 border border-green-300">
          Present: {summary.present}
        </span>
        <span className="inline-block px-2.5 py-1.5 rounded-full text-xs bg-orange-50 text-orange-900 border border-orange-300">
          Late: {summary.late}
        </span>
        <span className="inline-block px-2.5 py-1.5 rounded-full text-xs bg-red-50 text-red-900 border border-red-300">
          Absent: {summary.absent}
        </span>
        <span className="inline-block px-2.5 py-1.5 rounded-full text-xs bg-cyan-50 text-cyan-900 border border-cyan-300">
          On Leave: {summary.leave}
        </span>
      </div>
    </div>
  );
};

export default EmpAttenHeading;
