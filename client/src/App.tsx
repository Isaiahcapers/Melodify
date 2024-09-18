import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navigation"; // Assuming this is the correct path for your Navbar
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Navbar /> {/* Navigation is now used */}
      {/* Other components and routing logic */}
      <Outlet />
    </div>
  );
};

export default App;
