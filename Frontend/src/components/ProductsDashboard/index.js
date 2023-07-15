import React, { useState } from "react";
import FilterComponent from "../../components/FilterComponent";
import { Outlet } from "react-router-dom";
import { sortingContext } from "../Context";
import Footer from "../Footer";
const Index = () => {
  const initalValues = {
    price: "",
    // name: "",
  };
  const [sortValue, setSort] = useState(initalValues);

  return (
    <sortingContext.Provider value={{ sortValue, setSort }}>
      <div className="container ">
        <div className="row py-4">
          <div className="col-lg-2 ">
            <FilterComponent />
          </div>
          <div className="col-lg-9 ">
            <Outlet />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </sortingContext.Provider>
  );
};

export default Index;
