import React from "react";
import Navbar from "../../components/Navabar";

import "./index.css";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default index;
