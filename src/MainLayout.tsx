import React from "react";
import BmrCalculator from "./BmrCalculator";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "200px", padding: "20px" }}>
        <BmrCalculator />
      </div>
    </div>
  );
};

export default MainLayout;
