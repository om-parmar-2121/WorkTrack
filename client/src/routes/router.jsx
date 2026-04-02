import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import RegisterPending from "../pages/auth/RegisterPending";
import EmpDashboard from "../pages/employee/EmpDashboard";
import HrDashboard from "../pages/hr/HrDashboard";
import EmployeeList from "../pages/hr/EmployeeList";
import EmpAttendance from "../pages/hr/EmpAttendance";
import Approval from "../pages/hr/Approval";
import RequireAuth from "./RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/register-pending", element: <RegisterPending /> },
      {
        path: "/employee/dashboard",
        element: (
          <RequireAuth allowedRoles={["Employee"]}>
            <EmpDashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/hr/dashboard",
        element: (
          <RequireAuth allowedRoles={["HR"]}>
            <HrDashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/hr/employees",
        element: (
          <RequireAuth allowedRoles={["HR"]}>
            <EmployeeList />
          </RequireAuth>
        ),
      },
      {
        path: "/hr/attendance",
        element: (
          <RequireAuth allowedRoles={["HR"]}>
            <EmpAttendance />
          </RequireAuth>
        ),
      },
      {
        path: "/hr/approval",
        element: (
          <RequireAuth allowedRoles={["HR"]}>
            <Approval />
          </RequireAuth>
        ),
      }
    ]
  }
]);

export default router;
