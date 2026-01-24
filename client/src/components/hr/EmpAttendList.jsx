const EmpAttendList = () => {
  const Attendance = [
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Present" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Late" },
    { id: "E001", name: "Alice Johnson", dept: "Engineering", status: "Present" },
    { id: "E002", name: "Brian Smith", dept: "Design", status: "Present" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Late" },
    { id: "E004", name: "Diego Martinez", dept: "Sales", status: "Absent" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Present" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Late" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Present" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Late" },
    { id: "E001", name: "Alice Johnson", dept: "Engineering", status: "Present" },
    { id: "E002", name: "Brian Smith", dept: "Design", status: "Present" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Late" },
    { id: "E004", name: "Diego Martinez", dept: "Sales", status: "Absent" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Present" },
    { id: "E003", name: "Chloe Kim", dept: "HR", status: "Late" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="overflow-y-scroll no-scrollbar max-h-[550px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                Employee Name
              </th>
              <th className="px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                Department
              </th>
              <th className="px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                ID
              </th>
              <th className="px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Attendance.map((elem, index) => {
              const statusClasses = {
                Present: "✅",
                Absent: "❌",
                Late: "⏳",
              };

              return (
                <tr key={`${elem.id}-${elem.name}-${elem.status}-${index}`}>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {elem.name}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {elem.dept}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    {elem.id}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-200 text-sm">
                    <div className="flex items-center gap-2">
                      <div>{statusClasses[elem.status]}</div>
                      <div>{elem.status}</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAttendList;
