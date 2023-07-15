import React from "react";

const index = () => {
  return (
    <div className="mx-0 px-0">
      <footer className="text-center mb-0 text-lg-start bg-dark text-muted me-0 ms-0">
        {/* <!-- Section: Social media --> */}
        <section className="d-flex  justify-content-center text-white justify-content-lg-between p-4 border-bottom">
          {/* <!-- Left --> */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* <!-- Left --> */}

          {/* <!-- Right --> */}
          <div>
            <a href="#!" className="me-4 ">
              <i className="bi bi-facebook text-white"></i>
            </a>
            <a href="#!" className="me-4 link-secondary">
              <i className="bi bi-twitter text-white"></i>
            </a>
            <a
              href="mailto:srinivasyadavpolaveni@gmail.com"
              className="me-4 link-secondary"
            >
              <i className="bi bi-google text-white"></i>
            </a>
            <a
              href="https://www.instagram.com/srinupolaveni6/"
              className="me-4 link-secondary"
            >
              <i className="bi bi-instagram text-white"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/srinivas-polaveni-82a2b4239/"
              className="me-4 link-secondary"
            >
              <i className="bi bi-linkedin text-white"></i>
            </a>
            <a
              href="https://github.com/SrinivasPolaveni"
              className="me-4 link-secondary"
            >
              <i className="bi bi-github text-white"></i>
            </a>
          </div>
          {/* <!-- Right --> */}
        </section>
        {/* <!-- Section: Social media --> */}

        {/* <!-- Section: Links  --> */}
        <section className="text-white ">
          <div className="container-fluid  text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className=" col-12 col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-lg-4">
                  Company name :
                </h6>
                <p className="fw-bold ms-3">Flipkart</p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className=" col-12 col-md-3 col-lg-2 col-xl-2  mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Fashion
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Grocerys
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Mobiles
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Home Meterials
                  </a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-12 bg-dark col-md-2 col-lg-2 col-xl-2 mx-auto  mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Help
                  </a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-12 bg-dark col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-md-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact :</h6>
                <p>
                  <i className="bi bi-person-circle"></i> Srinivas Polaveni
                </p>
                <p>
                  <i className="bi bi-envelope-fill"></i>{" "}
                  srinivasyadavpolaveni@gmail.com
                </p>
                <p>
                  <i className="bi bi-phone"></i> +91 9182969103
                </p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center text-white p-1 pb-3 pb-lg-5 ">
          © 2023 Copyright : <b>Flipkart</b>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  );
};

export default index;
