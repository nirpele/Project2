import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Purchase from "./Purchase";
import "bootstrap/dist/css/bootstrap.min.css";
import Paypal from "./Paypal";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases);
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [paymentSubmit, setPaymentSubmit] = useState(false);
  const [payPalButtons, setPayPalButtons] = useState(false);

  const handleCallback = useCallback((childData) => {
    setPaymentSubmit(childData);
  }, []);

  useEffect(() => {
    if (paymentSubmit) {
      try {
        dispatch({
          type: "ADD PURCHASE",
          payload: {
            customerId: selectedCustomer,
            productId: selectedProduct,
          },
        });
      } catch (error) {
        console.error("Error adding purchase:", error);
        alert(`Failed to add purchase. Error: ${error.message}`);
      }
      setPaymentSubmit(false);
    }
  }, [paymentSubmit, dispatch, selectedCustomer, selectedProduct]);

  const filterPurchases = useCallback(() => {
    return purchases.filter((purchase) => {
      if (selectedCustomer && purchase.customerId !== selectedCustomer)
        return false;
      if (selectedProduct && purchase.productId !== selectedProduct)
        return false;
      return true;
    });
  }, [purchases, selectedCustomer, selectedProduct]);

  const filteredPurchases = useMemo(filterPurchases, [filterPurchases]);

  const handleAdd = () => {
    setPayPalButtons(!payPalButtons);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">All Customers</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.firstName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">All Products</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleAdd}>
            Add Purchase
          </button>
        </div>
      </div>
      <div className="text-center mb-3">

        {payPalButtons &&
          selectedCustomer !== "" &&
          selectedProduct !== "" &&
          products?.find((product) => product._id === selectedProduct).quantity > 0 && (
            <Paypal
              productDetails={products?.find(
                (product) => product._id === selectedProduct
              )}
              custmerDetails={customers?.find(
                (customer) => customer._id === selectedCustomer
              )}
              onSuccess={handleCallback}
            />
          )}
      </div>
      <div>
        {filteredPurchases.map((purchase) => (
          <Purchase key={purchase._id} purchase={purchase} />
        ))}
      </div>
    </div>
  );
};

export default Purchases;
