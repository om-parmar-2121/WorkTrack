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
      className="rounded-2xl shadow-xl p-6 mb-5 flex justify-between items-center border border-indigo-200"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center gap-6">
        <div className="h-16 w-16 rounded-full bg-white/90 border-2 border-indigo-300 ring-2 ring-white/60 flex items-center justify-center shadow-md">
          <span className="text-indigo-700 font-extrabold text-3xl leading-none">
            {finalName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2 tracking-tight">
            {finalName} <span className="text-4xl">👋</span>
          </h1>
          <p className="text-base md:text-lg text-indigo-100 font-medium">{user?.email || "hr@staffsphere.com"}</p>
        </div>
      </div>
    </div>
  );
};

export default HrHeader;
