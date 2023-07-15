import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/index";
import Product from "./pages/Product/index";

import Dashboard from "./components/Dashboard";
import Fashion from "./components/Fashion";
import Bikes from "./components/TwoWheelers";
import Mobiles from "./components/Mobiles";
import HomeMaterials from "./components/HomeMetireals";
import Grocery from "./components/Grocery";
import Electronics from "./components/Electronics";
import ProductDashboard from "./components/ProductsDashboard";
import CartItems from "./components/Cart";
// import Appliances from "./components/Appliances";
import SpecificProduct from "./components/SpecificProduct";
import Stationery from "./components/Stationery";
import OrderedData from "./components/OrderedData";
import NotFound from "./pages/NotFound";
import UnderDevelopment from "./pages/UnderDevelopment";
import { useEffect } from "react";
import { userDetails } from "./components/Redux/Reducer";
import { useDispatch } from "react-redux";
import OrderConfirmed from "./pages/OrderConfirmed";
import MyOrderes from "./components/MyOrders";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userDataFb = localStorage.getItem("FbUserDetails");
    if (userDataFb) {
      dispatch(userDetails(JSON.parse(userDataFb)));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<CartItems />} />
          <Route path="product/:id" element={<SpecificProduct />} />
          <Route path="booking/:id" element={<OrderedData />} />
          <Route path="appliances" element={<UnderDevelopment />} />
          <Route path="travel" element={<UnderDevelopment />} />
          <Route path="offers" element={<UnderDevelopment />} />
          <Route path="myorders" element={<MyOrderes />} />
          <Route path="order/success" element={<OrderConfirmed />} />
          <Route element={<ProductDashboard />}>
            {/* <Route path="appliances" element={<Appliances />} /> */}
            <Route path="vechiles" element={<Bikes />} />
            <Route path="fashion" element={<Fashion />} />
            <Route path="mobiles" element={<Mobiles />} />
            <Route path="homematerials" element={<HomeMaterials />} />
            <Route path="grocerys" element={<Grocery />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="stationery" element={<Stationery />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
