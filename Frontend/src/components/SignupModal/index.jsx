import React from "react";
import { useState } from "react";
//import { modalController, userLogin } from "../Redux/Reducer";
//import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./signup.css";

const Index = (props) => {
  //const []=useState()
  const InitialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  //const dispatch = useDispatch();

  const errors = {
    userRegister: "",
    passwordNotMatch: "",
  };

  const [userData, setUserdata] = useState(InitialValues);
  const [error, setError] = useState(errors);

  const onSbmitFormdata = (event) => {
    //console.log(userData);
    event.preventDefault();
    const reqData = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
    };
    if (userData.confirmPassword === userData.password) {
      setError({
        userRegister: "",
        passwordNotMatch: "",
      });

      fetch("http://localhost:3005/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((res) => res.json())
        .then((response) => {
          //console.log(response);
          if (response.status === "ok") {
            // props.modalControle();
            //dispatch(modalController(false));
            //dispatch(userLogin(true));
            toast.success("User Successfully Registered", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            props.toggleForm();
          } else {
            setError({
              ...error,
              passwordNotMatch: "",
              userRegister: "User Email Already existed",
            });
          }
        }).catch((err) => {
          toast.error("Registraion Failed,Please Try Again..", {
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
    } else {
      setError({
        ...error,
        passwordNotMatch: "Password Dosen't Matched",
        userRegister: "",
      });
    }
  };
  const onChangeUSerData = (event) => {
    const { name, value } = event.target;
    setUserdata((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChangeLoginPage = () => {
    props.toggleForm();
  };
  return (
    <div className="form-container">
      <p className="Logintitle">Sign up</p>
      <form
        className="form"
        onSubmit={onSbmitFormdata}
        encType="multipart/form-data"
      >
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            onChange={onChangeUSerData}
            value={userData.username}
            name="username"
            id="username"
            placeholder="Enter Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            required
            value={userData.email}
            onChange={onChangeUSerData}
            name="email"
            id="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={onChangeUSerData}
            required
            id="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="input-group my-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={onChangeUSerData}
            required
            id="confirmPassword"
            placeholder="Re-Enter Password"
          />
          <p className="text-danger">{error.passwordNotMatch}</p>
        </div>
        <button className="sign" type="submit">
          Sign up
        </button>
      </form>
      <p className="text-danger">{error.userRegister}</p>

      <p className="signup my-2">
        If you already have an account?
        <button className="SignBtn" onClick={onChangeLoginPage}>
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Index;
