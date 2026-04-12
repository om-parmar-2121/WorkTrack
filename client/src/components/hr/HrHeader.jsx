import { useEffect, useState } from "react";
import Background from "../../assets/images/HrNameBackground.jpg";
import { getMyEmployeeProfile } from "../../services/employeeService";

const HrHeader = () => {
  const [employeeFullName, setEmployeeFullName] = useState("");
  const storedUser = localStorage.getItem("staffsphereUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const loadName = async () => {
      if (user?.employeeFullName) {
        setEmployeeFullName(user.employeeFullName);
        return;
      }

      try {
        const employee = await getMyEmployeeProfile();
        const fullName = employee?.fullName || "";
        if (!fullName) return;

        setEmployeeFullName(fullName);
        localStorage.setItem(
          "staffsphereUser",
          JSON.stringify({ ...user, employeeFullName: fullName }),
        );
      } catch {
        // keep fallback name if request fails
      }
    };

    loadName();
  }, [user]);

  const role = user?.role;
  const fallbackNameSource = user?.email ? user.email.split("@")[0] : "HR";
  const nameSource = employeeFullName || user?.employeeFullName || fallbackNameSource;

  const displayName = nameSource
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const fallbackName = role === "HR" ? "HR Manager" : "Employee";
  const finalName = displayName || fallbackName;

  return (
    <div
      className="mb-5 flex flex-col gap-3 rounded-2xl border border-indigo-200 p-4 shadow-xl md:flex-row md:items-center md:justify-between md:p-6"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-300 bg-white/90 shadow-md ring-2 ring-white/60 md:h-16 md:w-16">
          <span className="text-2xl font-extrabold leading-none text-indigo-700 md:text-3xl">
            {finalName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 text-white">
          <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold tracking-tight md:mb-2 md:text-4xl">
            {finalName} <span className="text-2xl md:text-4xl">👋</span>
          </h1>
          <p className="truncate text-sm font-medium text-indigo-100 md:text-lg">{user?.email || "hr@staffsphere.com"}</p>
        </div>
      </div>
    </div>
  );
};

export default HrHeader;
