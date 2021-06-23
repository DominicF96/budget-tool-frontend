import React from "react";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import "./default-app-container.scss";

const DefaultAppContainer = ({children}) => {
  return (
    <div id="default_app_container">
      <Navbar />
      <Sidebar />
      <main id="app_content" className="fade-in">
        {children}
      </main>
    </div>
  );
};

export default DefaultAppContainer;
