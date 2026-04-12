const LeaveOverview = ({ statCards, onNewLeave }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900">Leave Overview</h2>
        <button
          type="button"
          onClick={onNewLeave}
          className="w-full cursor-pointer rounded-xl border border-blue-600 bg-blue-50 p-2 text-sm font-semibold text-blue-600 sm:w-auto"
        >
          + New Leave Request
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.title} className={`rounded-lg border p-4 ${card.tone}`}>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{card.title}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveOverview;
