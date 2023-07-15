import React from "react";

import { useEffect, useState } from "react";
import { cartListCount } from "../Redux/Reducer";
import { useDispatch, useSelector } from "react-redux";
import { modalController } from "../Redux/Reducer";
//import { useDispatch } from "react-redux";
import Footer from "../Footer/index";
import LoginModel from "../LoginModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "./index.css";

const Index = (props) => {
  const [cartData, setCartData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [quantity, setQuantity] = useState(1);
  const count = useSelector((sate) => sate.cartCountSlice.cartCount);
  const tokenVerify = useSelector((state) => state.cartCountSlice.token);
  const modalVerify = useSelector((state) => state.cartCountSlice.modal);
  useEffect(() => {
    getGrocerysData();
  }, []);

  function getGrocerysData() {
    const CartItems = localStorage.getItem("cartProducts");

    if (CartItems) {
      const parsedData = JSON.parse(CartItems);
      const filteredData = parsedData.filter((eachdata) => {
        //console.log(eachdata.quantity)
        if (eachdata.quantity !== undefined) {
          if (eachdata.specialPrice !== undefined) {
            return eachdata;
          } else {
            eachdata["specialPrice"] = eachdata.price;
            eachdata["originalPrice"] = eachdata.original_price;

            return eachdata;
          }
          //return eachdata;
        } else {
          eachdata["quantity"] = 1;
          if (eachdata.specialPrice !== undefined) {
            return eachdata;
          } else {
            eachdata["specialPrice"] = eachdata.price;
            eachdata["originalPrice"] = eachdata.original_price;
            return eachdata;
          }
          //return eachdata;
        }
      });

      const quantityAmountUpdatedData = filteredData.map((eachProduct) => {
        return {
          ...eachProduct,
          price: eachProduct.specialPrice * eachProduct.quantity,
          original_price: eachProduct.originalPrice * eachProduct.quantity,
        };
      });
      //console.log(filteredData);
      // uniqueCount.forEach(function(i) { count[i] = (count[i]||0) + 1;});
      //filteredData.forEach((eachData)=>{
      //
      //})
      setCartData(quantityAmountUpdatedData);
      dispatch(cartListCount(quantityAmountUpdatedData));
    }
  }

  function onRemoveToCart(eachProduct) {
    const verify = window.confirm(
      "Are you sure you want to remove this product from cart"
    );
    if (verify) {
      const cartItems = localStorage.getItem("cartProducts");

      let UpDatedCart = [];
      if (cartItems !== null) {
        const JSONData = JSON.parse(cartItems);

        UpDatedCart = JSONData.filter(
          (productItem) => productItem._id !== eachProduct._id
        );
        localStorage.setItem("cartProducts", JSON.stringify(UpDatedCart));
        setCartData(UpDatedCart);
        dispatch(cartListCount(UpDatedCart));
        toast.success("Removed From Cart", {
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
    }
  }

  function onIncreaseQuantity(id) {
    const filteredData = cartData.map((product) => {
      if (product._id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
          price: product.specialPrice * (product.quantity + 1),
          original_price: product.originalPrice * (product.quantity + 1),
        };
      } else {
        return product;
      }
    });
    //console.log(filteredData);
    localStorage.setItem("cartProducts", JSON.stringify(filteredData));
    setCartData(filteredData);
  }

  function onDecrementQuantity(id) {
    const filteredData = cartData.map((product) => {
      if (product._id === id) {
        return {
          ...product,
          quantity: product.quantity - 1,
          price: product.specialPrice * (product.quantity - 1),
          original_price: product.originalPrice * (product.quantity - 1),
        };
      } else {
        return product;
      }
    });
    //console.log(filteredData);
    const filteredData2 = filteredData.filter(
      (product) => product.quantity !== 0
    );

    localStorage.setItem("cartProducts", JSON.stringify(filteredData2));
    setCartData(filteredData2);
  }

  const onClearCartItems = () => {
    const verify = window.confirm("Are you sure you want to clear this cart");
    if (verify) {
      localStorage.removeItem("cartProducts");
      //const cartItems = localStorage.getItem("cartProducts");

      let UpDatedCart = [];

      localStorage.setItem("cartProducts", JSON.stringify(UpDatedCart));
      setCartData(UpDatedCart);
      dispatch(cartListCount(UpDatedCart));
      toast.success("Removed From Cart", {
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
  };

  const onLoginCheck = (id, quantity) => {
    if (!tokenVerify) {
      // setModalShow(true);

      dispatch(modalController(true));
    } else {
      dispatch(modalController(false));

      const verify = window.confirm(
        "Are you sure you want to buy this product.."
      );
      if (verify) {
        //dispatch(getProductId(id));
        navigate(`/booking/${id}`, {
          state: { quantity, cart_product_id: id },
        });
      }
    }
  };

  function grocerysProduct() {
    return (
      <>
        {count > 0 ? (
          <>
            <div className=" col-12 d-flex  justify-content-end">
              {count > 0 ? (
                <button
                  className="btn btn-danger me-4"
                  onClick={onClearCartItems}
                >
                  {" "}
                  Clear All
                </button>
              ) : null}
            </div>
            <div className="row shadow-sm justify-content-center border-1 my-4  py-3 ">
              {cartData.map((eachProduct) => (
                <div
                  key={eachProduct._id}
                  className="col-10 col-md-6 col-lg-3 Itemcard4  d-flex flex-column justify-content-around  text-center  p-2 "
                >
                  {/* <NavLink
                    to={`/product/${eachProduct._id}`}
                    className="text-decoration-none"
                  > */}
                  <div className="Itemcard5 ">
                    <div>
                      <img
                        src={eachProduct.img_url}
                        alt={eachProduct.title}
                        className="m-1 productImage3 mb-2"
                      />
                    </div>
                    <div
                      className="btn-group-sm"
                      role="group"
                      aria-label="Second group"
                    >
                      {eachProduct.quantity === 1 ? (
                        <button
                          type="button"
                          disabled
                          className="btn btn-secondary btn-sm m-1"
                          onClick={() => onDecrementQuantity(eachProduct._id)}
                        >
                          -
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm m-1"
                          onClick={() => onDecrementQuantity(eachProduct._id)}
                        >
                          -
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-light btn-sm m-1"
                      >
                        {eachProduct.quantity ? eachProduct.quantity : 1}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm m-1"
                        onClick={() => onIncreaseQuantity(eachProduct._id)}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      <h6 className="eachProduct-title ">
                        {eachProduct.title}
                      </h6>
                      <p className="descriptions">{eachProduct.description}</p>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="SpecialPrice">
                          Special Price: <br />
                          <span className>{eachProduct.price.toFixed(2)}</span>
                          <p className=" price">
                            {eachProduct.original_price.toFixed(2)}
                          </p>
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <button
                          className="btn py-2 cartRemoveBtn4 text-white "
                          onClick={(event) => onRemoveToCart(eachProduct)}
                        >
                          <i className="bi bi-cart-fill"></i> Remove From Cart
                        </button>
                        <button
                          className="btn py-2 my-2 text-white BUYBtn4  "
                          onClick={() =>
                            onLoginCheck(eachProduct._id, eachProduct.quantity)
                          }
                        >
                          <i className="bi bi-lightning-fill "></i>BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </NavLink> */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="row  " style={{ height: "80vh" }}>
            <div className=" col-12 d-flex  justify-content-center align-items-center">
              <h5>No Items Available...</h5>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div>
        <div className="container">
          <div className="row py-4">{grocerysProduct()}</div>
        </div>
        <div>
          <Footer />
        </div>
        <LoginModel
          show={modalVerify}
          onHide={() => dispatch(modalController(false))}
        />
      </div>
    </>
  );
};

export default Index;
