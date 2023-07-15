import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "axios";
import QRCode from "react-qr-code";
import "./myorders.module.css";

const Index = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getOrderData();
  }, []);

  function getOrderData() {
    const userData = localStorage.getItem("FbUserDetails");
    //console.log(userData);
    if (userData) {
      const ParsingUserData = JSON.parse(userData);
      axios
        .get(`http://localhost:3005/users/${ParsingUserData.id}`)
        .then((res) => {
          //console.log(res);
          setProduct(res.data.orders);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const navigate = useNavigate();
  const onNavigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="container">
          <div className="row py-5">
            <div className="col-12 ">
              <h5> Order Details:</h5>
              <hr style={{ width: "100%" }} />
            </div>
            <div className="col-12 ">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Tracker Id</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th> Price</th>
                      <th>Booked Date</th>
                      <th>Delivery Address</th>
                      <th>QRCode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>{product.quantity}</td>

                        <td className="text-success">
                          <b>{product.price ? product.price.toFixed(2) : ""}</b>
                        </td>
                        <td className="">
                          {new Date(product.booking_date).toLocaleString()}
                        </td>
                        <td>
                          <h5>{product.user_address.name}</h5>
                          <a href="!#">{product.user_address.email}</a>
                          <p>{product.user_address.phone_number}</p>
                          <p>
                            <b>Address:</b>
                            <br />
                            {product.user_address.address}
                          </p>
                        </td>
                        <td>
                          <div
                            style={{
                              height: "auto",
                              margin: "0 auto",
                              maxWidth: 64,
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
                              value={`
                              tracker_id=    ${product._id},
                              title=         ${product.title},
                              description=   ${product.description},
                              price=         ${product.price },
                              quantity=      ${product.quantity},
                              booking_date=  ${new Date(product.booking_date).toLocaleString()},
                              user_address=  ${product.user_address}
                            `}
                              viewBox={`0 0 256 256`}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "60vh" }}
        >
          {" "}
          <h5 className="fst-italic m-1">
            Looks like you haven't placed an order till now
          </h5>
          {/* <h3 className="fst-italic m-1">Page NotFound</h3> */}
          <button className="btn btn-primary m-2" onClick={onNavigateToHome}>
            Start Booking
          </button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Index;
