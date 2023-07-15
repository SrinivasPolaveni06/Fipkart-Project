import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import "./order.module.css";
const OrderConfirmed = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (location.state) {
      setProduct(location.state.reqData);
    }
  }, []);
  const navigate = useNavigate();
  const onNavigateToHome = () => {
    navigate("/");
  };

  const scanerData = `
    tracker_id=    ${product._id},
    title=         ${product.title},
    description=   ${product.description},
    price=         ${product.price * product.quantity},
    quantity=      ${product.quantity},
    booking_date=  ${new Date(product.booking_date).toLocaleString()},
    user_address=  ${product.user_address}
  `;
  return (
    <div>
      <div className="Ordered-Success-container py-5">
        <div className="d-flex  justify-content-center w3-container w3-center w3-animate-zoom">
          <i className="bi bi-check-circle Ordered-Success-icon"></i>
          <h3 className=" Ordered-Success-heading">Ordered Successfully</h3>
        </div>
        <div className="container py-3 w3-container w3-center w3-animate-zoom">
          <div className="row d-flex  flex-column align-items-center justify-content-center">
            <div className="col-11 col-lg-6">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                      <th>QR Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={product._id}>
                      <td>
                        <span className="text-success"> {product.title}</span> *{" "}
                        {product.quantity}
                      </td>

                      <td>{product.price ? product.price.toFixed(2) : ""}</td>
                      <td rowspan="4">
                        <div
                          style={{
                            height: "auto",
                            margin: "0 auto",
                            maxWidth: 140,
                            width: "100%",
                          }}
                        >
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              width: "100%",
                            }}
                            value={scanerData}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Cart SubTotal:</b>
                      </td>
                      <td>{product.price ? product.price.toFixed(2) : ""}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Shipping:</b>
                      </td>
                      <td>Free Shipping</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Order Total:</b>
                      </td>
                      <td> {product.price ? product.price.toFixed(2) : ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary m-2"
                onClick={onNavigateToHome}
              >
                Back To Home
              </button>
            </div>
            {/* <div className="col-12  d-flex justify-content-center  w3-container w3-center w3-animate-zoom">
              <div className="row d-flex  align-items-center">
                <div className="col-6">
                  <div
                    style={{
                      height: "auto",
                      margin: "0 auto",
                      maxWidth: 140,
                      width: "100%",
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={scanerData}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-primary m-2"
                    onClick={onNavigateToHome}
                  >
                    Back To Home
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmed;
