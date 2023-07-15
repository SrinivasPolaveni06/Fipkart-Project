import React from "react";

import { useEffect, useState } from "react";
//import { sortingContext } from "../Context";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./index.css";

const Index = (props) => {
  const { eachCategoryPdousct } = props;
  const [grocerysData, setGrocerysData] = useState([]);
  //const { sortValue } = useContext(sortingContext);
  useEffect(() => {
    getGrocerysData();
  }, []);

  function getGrocerysData() {
    axios
      .get(
        `http://localhost:3005/product/?search=${eachCategoryPdousct.category}&order_by=""&order=""&limit=4`
      )
      .then((res) => {
        //console.log(res);
        setGrocerysData(res.data);
      })
      .catch((err) => {
        console.log(err, "GRocerys error");
      });
  }

  function grocerysProduct() {
    return (
      <>
        <div className=" row d-flex homeShadowContainer border-1 my-4 px-3">
          {grocerysData.map((eachProduct) => (
            <div
              key={eachProduct._id}
              className=" col-6 col-lg-3 Itemcard  d-flex flex-column justify-content-around  text-center  p-2"
            >
              {" "}
              <NavLink
                to={`product/${eachProduct._id}`}
                className="text-decoration-none"
              >
                <div className="Itemcard2">
                  <div>
                    <img
                      src={eachProduct.img_url}
                      alt={eachProduct.title}
                      className="m-1 productImage1 mb-2"
                    />
                  </div>

                  <div>
                    <h6 className="eachProduct-title">{eachProduct.title}</h6>
                    <p className="descriptions">{eachProduct.description}</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="SpecialPrice">
                        Special Price: <br />
                        <span className>{eachProduct.price.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-xl-3">
        <NavLink
          to={eachCategoryPdousct.navigateUrl}
          className="text-decoration-none"
        >
          <div className="bg-primary p-3 p-lg-5 text-center rounded text-white">
            <h5>
              View Top New {eachCategoryPdousct.category} Products{" "}
              <i className="bi fs-4 rightIcon bi-box-arrow-right"></i>
            </h5>
          </div>
        </NavLink>
      </div>
      <div className="col-xl-9  ">{grocerysProduct()}</div>
    </>
  );
};

export default Index;
