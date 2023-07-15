import React from "react";
//import Navbar from "./components/Navabar";
import Header from "../Header";
import { data } from "../Headerdata";
import Carousel from "../Carousel";
import HomeCategoryProducts from "../HomeCategoryProducts";
import Footer from "../Footer";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const ProductsData = [
  {
    category: "Grocerys",
    navigateUrl: "/grocerys",
  },
  { category: "Mobiles", navigateUrl: "/mobiles" },
  { category: "Electronics", navigateUrl: "/electronics" },
  { category: "Fashion", navigateUrl: "/fashion" },
  { category: "Home Meterials", navigateUrl: "/homematerials" },
  { category: "Vechiles", navigateUrl: "/vechiles" },
  { category: "Stationery", navigateUrl: "/stationery" },
];

const Index = () => {
  const [mainData, setMainData] = useState([]);
  const searchedText = useSelector((state) => state.cartCountSlice.text);
  const [searchingProductsData, setSearchingProductsData] =
    useState(ProductsData);

  useEffect(() => {
    getTotalData();
    getFilteredProducts();
  }, [searchedText]);

  function getFilteredProducts() {
    //console.log(typeof searchedText);
    const updatedText = searchedText.trim();
    if (updatedText !== "") {
      const filteredProductsData = ProductsData.filter(
        (eachProduct) =>
          eachProduct.category
            .toLowerCase()
            .includes(updatedText.toLowerCase()) === true
      );
      setSearchingProductsData(filteredProductsData);
    } else {
      setSearchingProductsData(ProductsData);
    }
  }
  function getTotalData() {
    axios
      .get(`http://localhost:3005/product/data`)
      .then((res) => {
       // console.log(res);
        setMainData(res.data);
      })
      .catch((err) => {
        console.log(err, "GRocerys error");
      });
  }
  return (
    <>
      <div>
        {/* <div className="container">
          <div className="row">
          {data.map((eachData) => (
            <Header key={eachData.category} eachData={eachData} />
          ))}
          </div>

        </div> */}
        <div className=" pt-1 headerContainer shadow ">
          {data.map((eachData) => (
            <Header key={eachData.category} eachData={eachData} />
          ))}
        </div>
        <div className="py-2 shadow ">
          <Carousel />
        </div>
        <div className="container-fluid">
          {mainData.length > 0 ? (
            <>
              {searchingProductsData.length > 0 ? (
                <div className="row py-4 d-flex align-items-center">
                  {searchingProductsData.map((eachCategoryPdousct) => (
                    <HomeCategoryProducts
                      key={eachCategoryPdousct.category}
                      eachCategoryPdousct={eachCategoryPdousct}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center text-dark my
            
            -5 py-5"
                >
                  <h5 className="text-italic">
                    No Data Found
                    <br />
                    Please Enter Available Category...
                  </h5>
                </div>
              )}
            </>
          ) : (
            <div
              className="text-center text-dark my
            
            -5 py-5"
            >
              <h5 className="text-italic">
                No Data Found
                <br />
                Please Check Your Connection And Try Again...
              </h5>
            </div>
          )}
        </div>
        <div className="mt-2">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
