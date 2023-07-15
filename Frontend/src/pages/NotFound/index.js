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
      <h3 className="fst-italic m-1">404</h3>
      <h3 className="fst-italic m-1">Page NotFound</h3>
      <button className="btn btn-primary m-2" onClick={onNavigateToHome}>
        Back To Home
      </button>
    </div>
  );
};

export default Index;
