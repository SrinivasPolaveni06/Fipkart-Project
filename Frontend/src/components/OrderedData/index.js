import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserAddressModal from "../UserAddressModal";
import Footer from "../Footer";
import axios from "axios";
import "./index.css";

const Index = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [CartProductId, setCartProductId] = useState(null);
  const [orderVerify, setOrderVerify] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  //console.log(location);
  useEffect(() => {
    getOrderData();
    if (location.state) {
      setQuantity(location.state.quantity);
    }
    // setQuantity()
    if (location.state) {
      setCartProductId(location.state.cart_product_id);
    }
  }, []);

  function getOrderData() {
    axios
      .get(`http://localhost:3005/product/order/${id}`)
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onchangeQuantity(event) {
    const value = event.target.value;

    setQuantity(value);
  }

  const onChangeOrderVerify = () => {
    setOrderVerify(true);
  };

  const onCancelorder = () => {
    const verify = window.confirm("Are You Sure, You Want Cancel This Order..");
    if (verify) {
      navigate(-1);
    }
  };
  return (
    <>
      {orderVerify ? (
        <UserAddressModal
          setOrderVerify={setOrderVerify}
          productData={product}
          quantity={quantity}
          CartProductId={CartProductId}
        />
      ) : null}
      <div className="container">
        <div className="row py-5">
          <div className="col-12">
            <h5> Product Order Details:</h5>
            <hr style={{ width: "100%" }} />
          </div>
          <div className="col-12 ">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Original Price</th>
                    <th>Specail Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product._id}</td>
                    <td>{product.title}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        max={3}
                        value={quantity}
                        onChange={onchangeQuantity}
                      />
                    </td>

                    <td className="text-danger text-decoration-line-through">
                      {product.original_price
                        ? (product.original_price * quantity).toFixed(2)
                        : ""}
                    </td>
                    <td className="text-success">
                      <b>
                        {product.price
                          ? (product.price * quantity).toFixed(2)
                          : ""}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 py-3 text-center">
            <button
              className="btn Continue-To-Book m-2"
              onClick={() => onChangeOrderVerify()}
            >
              Continue To Book
            </button>
            <button className="btn btn-danger m-2" onClick={onCancelorder}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;
