const Calander = () => {
  const calendarDays = [
    { day: "", status: "empty" },
    { day: "", status: "empty" },
    { day: 1, status: "present" },
    { day: 2, status: "present" },
    { day: 3, status: "present" },
    { day: 4, status: "present" },
    { day: 5, status: "weekend" },
    { day: 6, status: "weekend" },
    { day: 7, status: "present" },
    { day: 8, status: "present" },
    { day: 9, status: "present" },
    { day: 10, status: "present" },
    { day: 11, status: "present" },
    { day: 12, status: "weekend" },
    { day: 13, status: "weekend" },
    { day: 14, status: "present" },
    { day: 15, status: "present" },
    { day: 16, status: "present" },
    { day: 17, status: "absent" },
    { day: 18, status: "absent" },
    { day: 19, status: "weekend" },
    { day: 20, status: "weekend" },
    { day: 21, status: "present" },
    { day: 22, status: "present" },
    { day: 23, status: "present" },
    { day: 24, status: "present" },
    { day: 25, status: "present" },
    { day: 26, status: "weekend" },
    { day: 27, status: "weekend" },
    { day: 28, status: "present" },
    { day: 29, status: "present" },
    { day: 30, status: "present" },
    { day: 31, status: "present" },
  ];

  const weekDays = ["s", "m", "t", "w", "t", "f", "s"];

  return (
    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-400 shadow-sm lg:row-span-2">
      <h2 className="text-2xl font-bold text-center mb-5 border-b-2 border-blue-400 pb-4">
        Calendar
      </h2>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center font-bold text-blue-500 text-sm"
          >
            {" "}
            {day}{" "}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj) => (
          <div
            key={dayObj.day}
            className="flex justify-center items-center py-0.5"
          >
            <div
              className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${dayObj.status === "present" ? "border border-green-500 text-green-500" : ""}
                      ${dayObj.status === "absent" ? "border border-red-500 text-red-500" : ""}
                      ${dayObj.status === "weekend" ? "border border-blue-400" : ""}
                      ${!dayObj.status ? "text-blue-500" : ""}
                    `}
            >
              {dayObj.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calander;
