import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const index = ({ eachData }) => {
  return (
    <>
      <div className="header-lorge-devices">
        <NavLink to={eachData.navigateUrl}>
          <button className="categorysButton">
            <img
              src={eachData.imageUrl}
              className="categorysImage"
              alt={eachData.imageUrl}
            />
            <p className="categoryTitle">{eachData.category}</p>
          </button>
        </NavLink>
      </div>

      <div className="col-2 col-md-1 header-small-devices">
        <NavLink to={eachData.navigateUrl}>
          <button className="categorysButton">
            <img
              src={eachData.imageUrl}
              className="categorysImage"
              alt={eachData.imageUrl}
            />
            <p className="categoryTitle">{eachData.category}</p>
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default index;
