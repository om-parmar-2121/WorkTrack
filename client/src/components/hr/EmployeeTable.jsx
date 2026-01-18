import { SquarePen } from "lucide-react";

const EmployeeTable = () => {
  const employees = [
    {
      name: "Riyad Ahmod",
      id: 1828267,
      email: "uiriyad@gmail.com",
      department: "Art & Design",
      designation: "Sr Product Designer",
    },
    {
      name: "Charles T",
      id: 1828267,
      email: "ahmedriyad338@gmail.com",
      department: "Development",
      designation: "Sr UI Designer",
    },
    {
      name: "Nahid Miah",
      id: 1828267,
      email: "uiriyad1999@gmail.com",
      department: "UI/UX Design",
      designation: "Jr UX Designer",
    },
    {
      name: "Parvej Reza",
      id: 1828267,
      email: "uireza200@gmail.com",
      department: "Development",
      designation: "Sr Developer",
    },
    {
      name: "Motiur Rahman",
      id: 1828267,
      email: "uiriyad@gmail.com",
      department: "UI/UX Design",
      designation: "Sr Motion Designer",
    },
    {
      name: "Atik Miah",
      id: 1828267,
      email: "uixatik123@gmail.com",
      department: "Development",
      designation: "Jr Product Manager",
    },
    {
      name: "Parvej Reza",
      id: 1828267,
      email: "uireza200@gmail.com",
      department: "Development",
      designation: "Sr Developer",
    },
    {
      name: "Atik Miah",
      id: 1828267,
      email: "uixatik123@gmail.com",
      department: "Development",
      designation: "Jr Product Manager",
    },
    {
      name: "Motiur Rahman",
      id: 1828267,
      email: "uiriyad@gmail.com",
      department: "UI/UX Design",
      designation: "Sr Motion Designer",
    },
    {
      name: "Riyad Ahmod",
      id: 1828267,
      email: "uiriyad@gmail.com",
      department: "Art & Design",
      designation: "Sr Product Designer",
    },
    {
      name: "Charles T",
      id: 1828267,
      email: "ahmedriyad338@gmail.com",
      department: "Development",
      designation: "Sr UI Designer",
    },
    {
      name: "Nahid Miah",
      id: 1828267,
      email: "uiriyad1999@gmail.com",
      department: "UI/UX Design",
      designation: "Jr UX Designer",
    },
    {
      name: "Parvej Reza",
      id: 1828267,
      email: "uireza200@gmail.com",
      department: "Development",
      designation: "Sr Developer",
    },
    {
      name: "Motiur Rahman",
      id: 1828267,
      email: "uiriyad@gmail.com",
      department: "UI/UX Design",
      designation: "Sr Motion Designer",
    },
    {
      name: "Atik Miah",
      id: 1828267,
      email: "uixatik123@gmail.com",
      department: "Development",
      designation: "Jr Product Manager",
    },
    {
      name: "Parvej Reza",
      id: 1828267,
      email: "uireza200@gmail.com",
      department: "Development",
      designation: "Sr Developer",
    },
    {
      name: "Atik Miah",
      id: 1828267,
      email: "uixatik123@gmail.com",
      department: "Development",
      designation: "Jr Product Manager",
    },
    {
      name: "Motiur Rahman",
      id: 1828267,
      email: "uiriyad@gmail.com",
      department: "UI/UX Design",
      designation: "Sr Motion Designer",
    },
  ];

  return (
    <div className="p-5 text-blue-900 bg-blue-100 border border-blue-400 rounded h-full overflow-y-scroll no-scrollbar">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-200 border-b-2 border-blue-400">
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">ID</th>
            <th className="text-left p-3 font-semibold">Email</th>
            <th className="text-left p-3 font-semibold">Department</th>
            <th className="text-left p-3 font-semibold">Designation</th>
            <th className="text-left p-3 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => {
            return (
              <tr
                key={index}
                className="border-b border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.id}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3">
                  <SquarePen
                    className="cursor-pointer hover:text-blue-700 transition-colors"
                    size={18}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
