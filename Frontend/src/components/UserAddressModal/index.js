import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { cartListCount } from "../Redux/Reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

function UserAddressModal(props) {
  //const [showLogin, setShowLogin] = useState(true); // State to manage login form visibility

  const InitialValues = {
    name: "",
    email: "",
    phone_number: "",
    address: "",
  };
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [modalShow, setModalShow] = React.useState(true);
  const [userData, setUserdata] = useState(InitialValues);
  const navigate = useNavigate();
  const removeCartItem = (id) => {
    const CartItems = localStorage.getItem("cartProducts");

    if (CartItems) {
      const parsedData = JSON.parse(CartItems);
      const filteredData = parsedData.filter((eachdata) => eachdata._id !== id);
      localStorage.setItem("cartProducts", JSON.stringify(filteredData));
      dispatch(cartListCount(filteredData));
    }
  };
  const onSbmitFormdata = (event) => {
    //console.log(userData);
    event.preventDefault();
    const reqData = {
      tracker_id: props.productData._id,
      title: props.productData.title,
      description: props.productData.description,
      price: props.productData.price * props.quantity,
      quantity: props.quantity,
      booking_date: new Date(),
      user_address: userData,
    };
    fetch("http://localhost:3005/orders/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("FbUserToken")}`,
      },
      body: JSON.stringify(reqData),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log(response);
        if (response.status === "ok") {
          if (props.CartProductId !== null) {
            removeCartItem(props.CartProductId);
          }
          toast.success("Booked Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setModalShow(false);
          props.setOrderVerify(false);
          navigate("/order/success",{
            state: { reqData },
          });
          setError("");
        } else {
          setError("Something Went Wrong, Please Try Again...");
          toast.error("Booking Cancelled, Try Again", {
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
      })
      .catch((err) => {
        toast.error("Booking Failed,Please Try Again..", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  const onChangeUSerData = (event) => {
    //console.log(event);
    const { name, value } = event.target;
    setUserdata((prevState) => ({ ...prevState, [name]: value }));
    setError("");
  };

  return (
    <>
      <Modal
        // {...props}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.setOrderVerify(false);
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // scrollable
        closeButton
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center py-4">
          <div className="form-container">
            <p className="Logintitle">Delivery Address</p>
            <form
              className="form"
              onSubmit={onSbmitFormdata}
              encType="multipart/form-data"
            >
              {" "}
              <div className="input-group">
                <label htmlFor="username">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={onChangeUSerData}
                  required
                  id="username"
                  placeholder="Enter Name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={onChangeUSerData}
                  value={userData.email}
                  id="email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  type="number"
                  name="phone_number"
                  onChange={onChangeUSerData}
                  value={userData.phone_number}
                  required
                  id="phonenumber"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={userData.address}
                  onChange={onChangeUSerData}
                  name="address"
                  placeholder="Enter Address"
                  required
                ></textarea>
              </div>
              <button className="addressSubmit" type="submit">
                Continue
              </button>
              <p className="text-danger">{error}</p>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserAddressModal;
