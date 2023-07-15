import React from "react";
import { useContext } from "react";
import { sortingContext } from "../Context";
import "./index.css";

const Index = (props) => {
  const { setSort } = useContext(sortingContext);
  //console.log(sortValue);
  function changeSort(event) {
    const { name, value } = event.target;
    //console.log(name,sort);
    setSort((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <div className="my-5 ">
      <div className="d-flex align-items-center ">
        <h4 className="mb-0 pb-0">Filters</h4>
        <i className="bi bi-filter ms-2 fs-2"></i>
      </div>

      <hr />
      <div className="d-flex d-lg-block flex-row ">
        <div className="form-check d-flex  align-items-center">
          <input
            className="form-check-input me-1"
            type="radio"
            value="ASC"
            onChange={changeSort}
            name="price"
            id="flexRadioDefault1"
          />
          <label
            className="form-check-label text-dark me-2"
            htmlFor="flexRadioDefault1"
          >
            Low Price
          </label>
        </div>
        <div className="form-check d-flex   align-items-center">
          <input
            className="form-check-input me-1"
            type="radio"
            value="DESC"
            onChange={changeSort}
            name="price"
            id="flexRadioDefault2"
          />
          <label
            className="form-check-label text-dark"
            htmlFor="flexRadioDefault2"
          >
            High Price
          </label>
        </div>
        {/* <div className="form-check">
          <input
            className="form-check-input "
            type="radio"
            value="ASC"
            onChange={changeSort}
            name="name"
            id="flexRadioDefault3"
          />
          <label
            className="form-check-label text-dark"
            htmlFor="flexRadioDefault3"
          >
            Name Asc
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input "
            type="radio"
            value="DESC"
            onChange={changeSort}
            name="name"
            id="flexRadioDefault4"
          />
          <label
            className="form-check-label text-dark"
            htmlFor="flexRadioDefault4"
          >
            Name Desc
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
