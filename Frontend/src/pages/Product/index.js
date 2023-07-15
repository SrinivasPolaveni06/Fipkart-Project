import * as React from "react";
//import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import FormControlLabel from "@mui/material/FormControlLabel";
// //import Checkbox from "@mui/material/Checkbox";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import "./index.css";

const Index = () => {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    img_url: "",
    category: "",
    original_price: "",
  };
  const [value, setValue] = useState(initialValues);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  function onFormSubmit(event) {
    const createDate = moment(new Date()).format("MM/DD/YYYY");
    //const targetDate = moment(value.target).format("MM/DD/YYYY");

    const TotalData = {
      ...value,
      createdAt: createDate,
    };
   // console.log(TotalData);
    fetch("http://localhost:3005/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify(TotalData),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log(response);
        if (response.status === "ok") {
          navigate("/");
        }
        //setError("");
      })
      .catch((err) => {
        console.log(err);
        //setError("User already Exists");
      });
    event.preventDefault();
    //console.log(value);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="my-4">Product Creation Form</h4>
      <form
        className="d-flex flex-column "
        onSubmit={(event) => onFormSubmit(event)}
      >
        <TextField
          id="outlined-basic1"
          label="Category Name"
          name="category"
          required
          variant="outlined"
          className="my-2 "
          value={value.category}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic2"
          label="Product Name"
          name="title"
          required
          variant="outlined"
          className="my-2 "
          value={value.title}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic3"
          label="Product Description"
          name="description"
          required
          variant="outlined"
          className="my-2 "
          value={value.description}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic4"
          label="Image Url"
          name="img_url"
          required
          variant="outlined"
          className="my-2 "
          value={value.img_url}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic5"
          label="Product Price"
          name="price"
          type="number"
          required
          variant="outlined"
          className="my-2 "
          value={value.price}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic6"
          label="Product original_price"
          name="original_price"
          type="number"
          required
          variant="outlined"
          className="my-2 "
          value={value.original_price}
          onChange={handleChange}
        />
        {/* <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="status"
            value={value.status}
            onChange={handleChange}
            className="d-flex flex-row my-3"
          >
            <FormControlLabel
              value="incomplete"
              control={<Radio />}
              label="Incomplete"
            />
            <FormControlLabel
              value="done"
              control={<Radio />}
              label="Complete"
            />
          </RadioGroup>
        </FormControl> */}
        {/* <TextField
          id="outlined-basic"
          label="Date"
          name="date"
          type="date"
          required
          variant="outlined"
          className="my-2 login"
          focused
          value={value.date}
          onChange={handleChange}
        /> */}

        <Button variant="contained" className="my-3" type="submit">
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default Index;
