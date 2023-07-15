import React from "react";

import { useEffect, useState, useContext } from "react";
import { sortingContext } from "../Context";
import axios from "axios";
import LoginModel from "../LoginModal";
//import FilterComponent from "../FilterComponent";
import { cartListCount, modalController } from "../Redux/Reducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Index = () => {
  const [grocerysData, setGrocerysData] = useState([]);
  // const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortValue } = useContext(sortingContext);
  const tokenVerify = useSelector((state) => state.cartCountSlice.token);
  const modalVerify = useSelector((state) => state.cartCountSlice.modal);
  useEffect(() => {
    getGrocerysData();
  }, [sortValue]);

  const onLoginCheck = (id) => {
    if (!tokenVerify) {
      // setModalShow(true);
      dispatch(modalController(true));
    } else {
      dispatch(modalController(false));
      const verify = window.confirm(
        "Are you sure you want to buy this product.."
      );
      if (verify) {
        navigate(`/booking/${id}`);
      }
    }
  };

  function getGrocerysData() {
    axios
      .get(
        `http://localhost:3005/product/?search=Mobiles&order_by=${sortValue.price}`
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
        <div className="row d-flex justify-content-between">
          {grocerysData.map((eachProduct) => (
            <div key={eachProduct._id} className="col-md-6 col-lg-4 ">
              <div className="product-card  d-flex flex-column justify-content-between my-3  p-3">
                <div className=" d-flex justify-content-center">
                  <img
                    src={eachProduct.img_url}
                    // style={{ width: "120px" }}
                    alt={eachProduct.title}
                    className="m-1 productImage mb-2"
                  />
                </div>

                <div className=" d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="text-center mobileTitles">{eachProduct.title}</h6>
                    <p className="text-center mobiledescription">{eachProduct.description}</p>
                    <div className="d-flex align-items-center">
                      <p className="SpecialPrice">
                        Special Price: <br />
                        <span className>{eachProduct.price.toFixed(2)}</span>
                      </p>
                      <p className="ms-auto me-3 price">
                        {eachProduct.original_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn py-2 cartBtn text-white me-2"
                      onClick={(event) => onAddToCart(eachProduct)}
                    >
                      <i className="bi bi-cart-fill"></i> ADD TO CART
                    </button>
                    <button
                      className="btn py-2  text-white BUYBtn  ms-auto"
                      onClick={() => onLoginCheck(eachProduct._id)}
                    >
                      <i className="bi bi-lightning-fill"></i>BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  function onAddToCart(eachProduct) {
    const cartItems = localStorage.getItem("cartProducts");
    const verify = window.confirm(
      "Are you sure you want to add this product to cart"
    );
    if (verify) {
      //console.log(cartItems);
      //console.log(eachProduct);
      const newChangedProduct = {
        ...eachProduct,
        specialPrice: eachProduct.price,
        originalPrice: eachProduct.original_price,
        quantity: 1,
      };
      // eachdata["specialPrice"] = eachdata.price;
      //         eachdata["originalPrice"] = eachdata.original_price;
      let UpDatedCart = [];
      if (cartItems !== null) {
        const JSONData = JSON.parse(cartItems);
        //console.log(JSONData);
        let condition = false;
        const newData = JSONData.map((eachData) => {
          if (eachData._id === newChangedProduct._id) {
            condition = true;
            return { ...eachData, quantity: eachData.quantity + 1 };
          } else {
            return eachData;
          }
        });
        //console.log(newData);
        //console.log(condition);

        if (condition === true) {
          UpDatedCart = newData;
        } else {
          UpDatedCart = [...newData, newChangedProduct];
        }

        // UpDatedCart.push()
        localStorage.setItem("cartProducts", JSON.stringify(UpDatedCart));
        toast.success("Added To Cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        UpDatedCart.push(newChangedProduct);
        localStorage.setItem("cartProducts", JSON.stringify(UpDatedCart));
        toast.success("Added To Cart", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      //eachProduct
      dispatch(cartListCount(UpDatedCart));
      //console.log(UpDatedCart);
    }
  }
  return (
    // <div className="container ">
    //   <div className="row py-4">
    //     <div className="col-3">
    //       <FilterComponent />
    //     </div>
    //     <div className="col-9 ">
    <div>
      <h3 className="text-danger">Top Mobiles List:</h3>
      <hr className="Grocerys" />
      {grocerysData.length > 0 ? (
        grocerysProduct()
      ) : (
        <div className="text-center text-dark mt-5 pt-5">
          <h5>
            No Data Found...
            <br /> Check Your Connection And Try Again..
          </h5>
        </div>
      )}
      <LoginModel
        show={modalVerify}
        onHide={() => dispatch(modalController(false))}
      />
    </div>
    //   </div>
    // </div>
  );
};

export default Index;
