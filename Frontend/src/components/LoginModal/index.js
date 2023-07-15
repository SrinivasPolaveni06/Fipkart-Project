import React, { useState } from "react";
//import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SignupModal from "../SignupModal";
import { modalController, userLogin, userDetails } from "../Redux/Reducer";
import ForgotPassword from "../ForgotPassword";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import "./login.css";

function MyVerticallyCenteredModal(props) {
  const [showLogin, setShowLogin] = useState(true); // State to manage login form visibility
  const [forgotPassword, setForgotPassword] = useState(true);
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const InitialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  //const [modalShow, setModalShow] = React.useState(false);
  const [userData, setUserdata] = useState(InitialValues);

  const onSbmitFormdata = (event) => {
    //console.log(userData);
    event.preventDefault();
    fetch("http://localhost:3005/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log(response);
        if (response.status === "ok") {
          // props.modalControle();
          var decoded = jwtDecode(response.token);
          const userDataFb = {
            name: decoded.name,
            email: decoded.email,
          };
          dispatch(userDetails(userDataFb));

          localStorage.setItem("FbUserDetails", JSON.stringify(decoded));

          setError("");
          localStorage.setItem("FbUserToken", response.token);
          dispatch(modalController(false));
          dispatch(userLogin(true));
          toast.success("Successfully Loged In", {
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
          setError(response.error);
          toast.error("Login Failed, Try Again..", {
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
        toast.error("Login Failed,Please Try Again..", {
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
    const { name, value } = event.target;
    setUserdata((prevState) => ({ ...prevState, [name]: value }));
    setError("");
  };

  const onChangeForgetPasswordStatus = () => {
    setForgotPassword(!forgotPassword);
  };

  return (
    <>
      <Modal
        {...props}
        // show={modalShow}
        // onHide={() => setModalShow(false)}
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
          {showLogin ? (
            forgotPassword ? (
              <div className="form-container">
                <p className="Logintitle">Login</p>
                <form
                  className="form"
                  onSubmit={onSbmitFormdata}
                  encType="multipart/form-data"
                >
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={onChangeUSerData}
                      id="email"
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={onChangeUSerData}
                      required
                      id="password"
                      placeholder="Enter Password"
                    />
                    <div className="forgot">
                      <a
                        type="button"
                        className="text-primary text-decoration-underline"
                        onClick={onChangeForgetPasswordStatus}
                      >
                        Forgot Password ?
                      </a>
                    </div>
                  </div>
                  <button className="sign" type="submit">
                    Sign in
                  </button>
                  <p className="text-danger">{error}</p>
                </form>
                <div className="social-message">
                  <div className="line"></div>
                  <p className="message">Login with social accounts</p>
                  <div className="line"></div>
                </div>
                <div className="social-icons">
                  <button aria-label="Log in with Google" className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                  </button>
                  <button aria-label="Log in with Twitter" className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                    </svg>
                  </button>
                  <button aria-label="Log in with GitHub" className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                    </svg>
                  </button>
                </div>
                <p className="signup my-2">
                  Don't have an account?
                  <button className="SignBtn" onClick={toggleForm}>
                    Sign up
                  </button>
                </p>
              </div>
            ) : (
              <ForgotPassword
                onChangeForgetPasswordStatus={onChangeForgetPasswordStatus}
              />
            )
          ) : (
            <SignupModal
              toggleForm={toggleForm}
              // modalControle={modalControle}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyVerticallyCenteredModal;
