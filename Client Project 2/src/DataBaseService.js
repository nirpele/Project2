import axios from "axios";
const accessToken = sessionStorage["accessToken"];

export const addPurchase = async (purchase, product) => {
  try {
    await axios.post("http://localhost:3000/purchases", purchase, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
    await axios.put(`http://localhost:3000/products/${product._id}`, product, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (error) {
    console.error("Error adding purchase:", error);
    return false;
  }
};

export const handleDeletePurchase = async (purchaseId) => {
  try {
    await axios.delete(`http://localhost:3000/purchases/${purchaseId}`, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch {
    console.error("Error delete customer and is purchases:", error);
    return false;
  }
};
