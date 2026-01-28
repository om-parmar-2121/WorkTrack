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
    { day: 23, status: "null" },
    { day: 24, status: "null" },
    { day: 25, status: "null" },
    { day: 26, status: "null" },
    { day: 27, status: "null" },
    { day: 28, status: "null" },
    { day: 29, status: "null" },
    { day: 30, status: "null" },
    { day: 31, status: "null" },
  ];

  const weekDays = ["s", "m", "t", "w", "t", "f", "s"];

  return (
    <div className="rounded-lg p-4shadow-sm h-fit">
      <h2 className="text-xl font-bold text-center mb-3 border-b border-gray-400 pb-2">
        Calendar
      </h2>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center font-bold text-gray-600-500 text-xs"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj, index) => (
          <div
            key={index}
            className="flex justify-center items-center py-0.5"
          >
            <div
              className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${dayObj.status === "present" ? "text-green-500" : ""}
                      ${dayObj.status === "absent" ? "text-red-500" : ""}
                      ${dayObj.status === "weekend" ? "text-blue-500" : ""}
                      ${dayObj.status === "null" ? "text-gray-300" : ""}
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
