import React from "react";
import BmrCalculator from "./BmrCalculator";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "0px", padding: "0px" }}>
        <BmrCalculator />
      </div>
    </div>
  );
};

export default MainLayout;
