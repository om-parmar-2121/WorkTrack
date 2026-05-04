import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <Outlet />
      <Analytics />
    </>
  );
};

export default App;