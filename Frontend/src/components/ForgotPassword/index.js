import React from "react";
import { useState } from "react";

import { toast } from "react-toastify";

const Index = (props) => {
  const InitialValues = {
    password: "",
    confirmPassword: "",
    email: "",
  };

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
      password: userData.password,
      email: userData.email,
    };
    if (userData.confirmPassword === userData.password) {
      setError({
        userRegister: "",
        passwordNotMatch: "",
      });

      fetch("http://localhost:3005/users/password/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((res) => res.json())
        .then((response) => {
          //console.log(response);
          if (response.status === "ok") {
            toast.success("Password Successfully Updated", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            // props.toggleForm();
            props.onChangeForgetPasswordStatus();
          } else {
            setError({
              ...error,
              passwordNotMatch: "",
              userRegister: "User Email Not Registered",
            });
          }
        })
        .catch((err) => {
          toast.error("Updation Failed,Please Try Again..", {
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

  return (
    <div className="form-container">
      <p className="Logintitle">Update Password</p>
      <form
        className="form"
        onSubmit={onSbmitFormdata}
        encType="multipart/form-data"
      >
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
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger  px-md-5 px-sm-5"
            type="button"
            onClick={props.onChangeForgetPasswordStatus}
          >
            Cancel
          </button>
          <button className="btn btn-primary  px-md-5 px-sm-5" type="submit">
            Update
          </button>
        </div>
      </form>
      <p className="text-danger">{error.userRegister}</p>
    </div>
  );
};

export default Index;
