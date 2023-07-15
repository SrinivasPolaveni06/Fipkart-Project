import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cartListCount, modalController } from "../Redux/Reducer";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginModel from "../LoginModal";
import { toast } from "react-toastify";
import "./index.css";

const Index = () => {
  const [product, setProduct] = useState({});
  //const { sortValue } = useContext(sortingContext);
  const { id } = useParams();
  const [similarData, setSimilarData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { sortValue } = useContext(sortingContext);
  const tokenVerify = useSelector((state) => state.cartCountSlice.token);
  const modalVerify = useSelector((state) => state.cartCountSlice.modal);
  useEffect(() => {
    getGrocerysData();
    // getSimilarProducts();
  }, []);

  useEffect(() => {
    // getGrocerysData();
    // setTimeout(() => {
    getSimilarProducts();
    // }, 5000);
  }, [product]);

  function getSimilarProducts() {
    axios
      .get(
        `http://localhost:3005/product/?search=${product.category}&order_by=""&order=""`
      )
      .then((res) => {
        //console.log(res, "similar");
        setSimilarData(res.data);
      })
      .catch((err) => {
        console.log(err, "GRocerys error");
      });
  }

  function getGrocerysData() {
    axios
      .get(`http://localhost:3005/product/${id}`)
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  function specificProduct() {
    return (
      <>
        <div
          key={product._id}
          className=" row d-flex  flex-column  align-items-center
            py-4"
        >
          <div className="col-11  col-lg-8">
            <h4 className="text-start text-decoration-underline Specific-Product-Details">
              Specific Product Details:
            </h4>

            <div className=" d-flex flex-column flex-lg-row justify-content-around  my-3  specificCard ">
              <div className=" d-flex justify-content-center mb-4 mb-lg-0">
                <img
                  src={product.img_url}
                  alt={product.title}
                  className="m-1 ImagespecificProduct  "
                />
              </div>

              <div className=" fetures-container d-flex flex-column justify-content-center">
                <div>
                  <h6 className="text-center">{product.title}</h6>
                  <p className="text-center">{product.description}</p>
                  <div className="d-flex justify-content-around align-items-center">
                    <p className="SpecialPrice">
                      Special Price: <br />
                      {product.price ? (
                        <span className>{product.price.toFixed(2)}</span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p className=" price">
                      {/* {product.original_price.toFixed(2)} */}
                      {product.original_price
                        ? product.original_price.toFixed(2)
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-around">
                  <button
                    className="btn py-2 cartBtn text-white me-2"
                    onClick={(event) => onAddToCart(product)}
                  >
                    <i className="bi bi-cart-fill"></i> ADD TO CART
                  </button>
                  <button
                    className="btn py-2  text-white BUYBtn  "
                    onClick={() => onLoginCheck(product._id)}
                  >
                    <i className="bi bi-lightning-fill"></i>BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const getsimilarProductsCarousel = () => {
    return (
      <div className="container text-center my-3">
        {/* <h2 className="font-weight-light">Bootstrap Multi Slide Carousel</h2> */}
        <h4 className="text-center SimilarHeading">Top Similar Products</h4>
        <hr style={{ width: "100%", lineHeight: "12px" }} />
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="recipeCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner carousel-inner1" role="listbox">
              {similarData.map((eachProduct, index) => {
                if (index === 0) {
                  return (
                    <div className="carousel-item active" key={eachProduct._id}>
                      <div className="col-6 col-md-4 col-lg-3  p-1">
                        {" "}
                        <Link to={`/product/${eachProduct._id}`}>
                          <div className="card py-2 d-flex flex-column justify-content-center align-items-center">
                            <div className="card-img">
                              <img
                                src={eachProduct.img_url}
                                alt={eachProduct.title}
                                className="m-1 carouselImage1 mb-4 rounded"
                              />
                            </div>{" "}
                            <div className="p-1">
                              <h6 className="eachProduct-title ">
                                {eachProduct.title}
                              </h6>
                              <p className="descriptions ">
                                {eachProduct.description} lorem
                              </p>
                              <div className="d-flex align-items-center justify-content-center">
                                <p className="SpecialPrice ">
                                  Special Price: <br />
                                  <span className>
                                    {eachProduct.price.toFixed(2)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>{" "}
                        </Link>
                      </div>{" "}
                    </div>
                  );
                } else {
                  return (
                    <div className="carousel-item " key={eachProduct._id}>
                      <div className=" col-6 col-md-4 col-lg-3  p-1">
                        {" "}
                        <Link to={`/product/${eachProduct._id}`}>
                          <div className="card py-2 d-flex flex-column justify-content-center align-items-center">
                            <div className="card-img">
                              <img
                                src={eachProduct.img_url}
                                alt={eachProduct.title}
                                className="m-1 carouselImage1 mb-4"
                              />
                            </div>{" "}
                            <div className="p-1">
                              <h6 className="eachProduct-title ">
                                {eachProduct.title}
                              </h6>
                              <p className="descriptions ">
                                {eachProduct.description}
                              </p>
                              <div className="d-flex align-items-center justify-content-center">
                                <p className="SpecialPrice ">
                                  Special Price: <br />
                                  <span className>
                                    {eachProduct.price.toFixed(2)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>{" "}
                        </Link>
                      </div>{" "}
                    </div>
                  );
                }
              })}{" "}
            </div>{" "}
            <a
              className="carousel-control-prev bg-transparent w-aut"
              href="#recipeCarousel"
              role="button"
              data-bs-slide="prev"
            >
              {" "}
              <span
                className="carousel-control-prev-icon text-dark bg-dark p-1 rounded"
                aria-hidden="true"
              ></span>{" "}
            </a>{" "}
            <a
              className="carousel-control-next bg-transparent w-aut "
              href="#recipeCarousel"
              role="button"
              data-bs-slide="next"
            >
              {" "}
              <span
                className="carousel-control-next-icon bg-dark p-1  rounded"
                aria-hidden="true"
              ></span>{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        {/* <h5 className="mt-2 fw-light">advances one slide at a time</h5> */}
      </div>
    );
  };
  let items = document.querySelectorAll(".carousel .carousel-item");

  items.forEach((el) => {
    const minPerSlide = 4;
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        // wrap carousel by using first child
        next = items[0];
      }
      let cloneChild = next.cloneNode(true);
      el.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });
  return (
    <>
      <div className="container">{specificProduct()}</div>

      <div>
        {getsimilarProductsCarousel()}

        <Footer />
      </div>
      <LoginModel
        show={modalVerify}
        onHide={() => dispatch(modalController(false))}
      />
    </>
  );
};

export default Index;
