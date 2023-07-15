import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const onNavigateToHome = () => {
    navigate("/");
  };
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      {" "}
      <h4 className="fst-italic m-1 text-center">Sorry</h4>
      <h4 className="fst-italic m-1 text-center">
        Currently This Page Is Under Development..
      </h4>
      <button className="btn btn-primary m-2" onClick={onNavigateToHome}>
        Back To Home
      </button>
    </div>
  );
};

export default Index;
