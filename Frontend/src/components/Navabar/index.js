import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  cartListCount,
  modalController,
  userLogin,
  userSearchText,
} from "../Redux/Reducer";
import { userDetails } from "../Redux/Reducer";
import { useDispatch } from "react-redux";
import LoginModel from "../LoginModal";
import { NavLink } from "react-router-dom";

import "./index.css";
const Index = () => {
  // const [user, setUser] = React.useState({ name: "", email: "" });
  useEffect(() => {
    getGrocerysData();
  }, []);
  
  const dispatch = useDispatch();

  function getGrocerysData() {
    const CartItems = localStorage.getItem("cartProducts");
    const userToken = localStorage.getItem("FbUserToken");

    if (CartItems) {
      // setCartData(JSON.parse(CartItems));
      dispatch(cartListCount(JSON.parse(CartItems)));
    }

    if (userToken) {
      dispatch(userLogin(true));
    } else {
      dispatch(userLogin(false));
    }
  }

  const onLogoutUser = () => {
    localStorage.removeItem("FbUserToken");
    localStorage.removeItem("FbUserDetails");
    //setUser({ name: "", email: "" });
    dispatch(userDetails({ name: "", email: "" }));
    dispatch(userLogin(false));
  };

  const onLoginController = () => {
    dispatch(modalController(true));
  };

  const onChangeSearchText = (event) => {
    const Text = event.target.value;
    dispatch(userSearchText(Text));
  };

  const count = useSelector((sate) => sate.cartCountSlice.cartCount);
  const modalVerify = useSelector((state) => state.cartCountSlice.modal);
  const tokenVerify = useSelector((state) => state.cartCountSlice.token);
  const searchedText = useSelector((state) => state.cartCountSlice.text);
  const userDetailsState = useSelector((state) => state.cartCountSlice.user);
  //console.log(count);
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbarContainer bg-body-tertiary ">
        <div className="container-fluid ">
          <div className="d-flex flex-column ">
            <a className="navbar-brand text-white title pb-0 mb-0" href="/">
              Flipkart
            </a>
            <a className="navbar-brand text-white Explore pt-0 mt-0" href="/">
              Explore <span className="Plus">Plus</span>
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse Searchwidth"
            id="navbarSupportedContent"
          >
            <form className="d-flex position-relative" role="search">
              <input
                className="form-control me-2 search px-3 pe-lg-5"
                type="search"
                placeholder="Search based on category.."
                aria-label="Search"
                value={searchedText}
                onChange={onChangeSearchText}
              />
              <button className="btn btnSearch text-white" type="button">
                <i className="bi bi-search searchIcon"></i>
              </button>
            </form>

            <div className="dropdown">
              <button
                className="persion-icon "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
              </button>

              {userDetailsState.name !== "" ? (
                <ul className="dropdown-menu text-center ">
                  <li>
                    <h4 className="dropdown-item">
                      <b>{userDetailsState.name}</b>
                    </h4>
                  </li>

                  <hr style={{ width: "100%" }} />

                  <li>
                    <a className="dropdown-item text-primary" href="!#">
                      {userDetailsState.email}
                    </a>
                  </li>

                  <hr style={{ width: "100%", marginTop: "10px" }} />

                  <li>
                    {tokenVerify ? (
                      <button
                        className="btn 
                      dropdown-item
               "
                        onClick={onLogoutUser}
                      >
                        <b>Logout</b>
                      </button>
                    ) : (
                      <button
                        className="btn  dropdown-item "
                        onClick={() => onLoginController()}
                      >
                        <b>Login</b>
                      </button>
                    )}
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu text-center">
                  <li>
                    {tokenVerify ? (
                      <button
                        className="btn 
                      dropdown-item
               "
                        onClick={onLogoutUser}
                      >
                        <b>Logout</b>
                      </button>
                    ) : (
                      <button
                        className="btn  dropdown-item "
                        onClick={() => onLoginController()}
                      >
                        <b>Login</b>
                      </button>
                    )}
                  </li>
                </ul>
              )}
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
              <NavLink to="/">
                <li className="nav-item text-white my-1 mx-lg-1">
                  {/* <a
                  className="nav-link active text-white"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a> */}
                  Home
                </li>
              </NavLink>
              {userDetailsState.email === "srinivas@gmail.com" ? (
                <NavLink to="/product">
                  <li className="nav-item text-white my-1 mx-lg-1">
                    {/* <a className="nav-link text-white" href="/product">
                  Product
                </a> */}
                    Product
                  </li>
                </NavLink>
              ) : (
                ""
              )}
              <NavLink to="/myorders">
                <li className="nav-item text-white my-1 mx-lg-1">
                  {/* <a className="nav-link text-white" href="/myorders">
                  MyOrderes
                </a> */}
                  MyOrderes
                </li>
              </NavLink>
              <NavLink to="/cart">
                <li className="nav-item text-white my-1 mx-lg-1">
                  {/* <a className="nav-link text-white" href="/cart">
                  Cart <span className="badge bg-danger ">{count}</span>
                </a> */}
                  Cart <span className="badge bg-danger ">{count}</span>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
      <LoginModel
        show={modalVerify}
        onHide={() => dispatch(modalController(false))}
      />
    </div>
  );
};

export default Index;
