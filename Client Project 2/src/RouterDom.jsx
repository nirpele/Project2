import { Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customers";
import UpdateCustomer from "./components/UpdateCustomer";
import Products from "./components/Products";
import UpdateProduct from "./components/UpdateProduct";
import Purchases from "./components/Purchases";
import Login from "./components/Login";
import App from "./App";
import NotFound from "./components/NotFound";

const accessToken = sessionStorage.getItem("accessToken");

const RouterDom = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {console.log(accessToken)}
      {accessToken ? (
        <>
          <Route path="/hello" element={<App />} />
          <Route path="/customers" element={<Customers />} />
          <Route
            path="/updateCustomer/:customerId"
            element={<UpdateCustomer />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/updateProduct/:productId" element={<UpdateProduct />} />
          <Route path="/purchases" element={<Purchases />} />
        </>
      ) : (
        <>
        <Route path="*" element={<NotFound />} />
      </>
      )}
    </Routes>
  );
};

export default RouterDom;
