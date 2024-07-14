import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";

const Paypal = ({ productDetails, custmerDetails, onSuccess }) => {
  const intialOptions = {
    "client-id":
      "AVDK5Uh5YHlBhglT0lrblzVERP6SFv5n2Y4fQqOB98erhUQefCGHzkH-CnCSGf11L_lnWFLexvRaUZSk",
    currency: "USD",
    intent: "capture",
  };
  const createOrder = (data, actions) => {
    console.log("Creating order with price:", productDetails?.price);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: `${productDetails.price}`,
            },
            description: `product name: ${productDetails.name} - Customer name: ${custmerDetails.firstName} ${custmerDetails.lastName} - city: ${custmerDetails.city} `
          },
        ],
      })
      .then((orderId) => {
        console.log("Order ID:", orderId);
        return orderId;
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        throw err;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        // Ensure `payer` and `payer.name` are defined
        if (details.payer && details.payer.name) {
          onSuccess(true);
          //alert("Transaction completed by: " + details.payer.name.given_name);
        } else {
          console.warn("Payer details are missing:", details);
          alert("Transaction completed, but payer details are missing.");
        }
        onSuccess(true);
      })
      .catch((err) => {
        console.error("Error capturing order:", err);
        onSuccess(false);
      });
  };

  return (
    <PayPalScriptProvider options={intialOptions}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      ></PayPalButtons>
    </PayPalScriptProvider>
  );
};
export default Paypal;
