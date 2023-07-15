import Carousel from "react-bootstrap/Carousel";
import "./index.css";
function UncontrolledExample() {
  return (
    <Carousel
      variant="dark"
      nextIcon={
        <span
          aria-hidden="true"
          className="btn btn-success carousel-control-next-icon"
        />
      }
      prevIcon={
        <span
          aria-hidden="true"
          className="btn btn-primary carousel-control-prev-icon"
        />
      }
    >
      {/* <span aria-hidden="true" className="btn btn-primary carousel-control-next-icon" /> */}
      {/* <span className="glyphicon glyphicon-glass"></span> */}
      <Carousel.Item>
        <img
          className="d-block carouselImage"
          src="https://rukminim1.flixcart.com/fk-p-flap/844/140/image/4ec7ced1890d27de.jpg?q=50"
          alt="fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carouselImage"
          src="https://rukminim1.flixcart.com/fk-p-flap/844/140/image/7420bd92b998967c.jpg?q=50"
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block carouselImage"
          src="https://www.printvenue.com/static/bachat-wali-diwali-offers"
          alt="Second slide"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carouselImage"
          src="https://www.flashsaletricks.com/wp-content/uploads/2017/01/Paytm_The-Big-Electronics-Bazaar_sale_17-19Jan.jpg"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
