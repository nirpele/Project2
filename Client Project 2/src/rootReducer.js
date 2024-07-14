import { v4 as uuidv4 } from "uuid";
import { addPurchase, handleDeletePurchase } from "./DataBaseService";

const initialState = {
  customers: [],
  products: [],
  purchases: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD": {
      console.log(action.payload.products);
      return {
        ...state,
        products: action.payload.products,
        customers: action.payload.customers,
        purchases: action.payload.purchases,
      };
    }

    case "ADD CUSTOMER": {
      return {
        ...state,
        customers: [...state.customers, {...action.payload }],
      };
    }

    //worked
    case "DELETE CUSTOMER": {
      const customers = [...state.customers];
      const customerIdToDelete = action.payload;
      const purchases = [...state.purchases];
      const index = customers.findIndex(
        (customer) => customer._id === customerIdToDelete
      );
      if (index !== -1) {
        customers.splice(index, 1);
        const purchWithoutCusDel =
          purchases.length > 0
            ? purchases.map((purchase) =>
                purchase.customerId === customerIdToDelete
                  ? handleDeletePurchase(purchase._id)
                  : purchase
              )
            : null;
        if (purchWithoutCusDel !== null) {
          return {
            ...state,
            customers: customers,
            purchases: purchWithoutCusDel,
          };
        }
      }
      return { ...state, customers };
    }

    //worked
    case "UPDATE CUSTOMER": {
      const customers = [...state.customers];
      const index = customers.findIndex(
        (customer) => customer._id === action.payload._id
      );
      if (index !== -1) {
        const updatedCustomer = { ...action.payload };
        customers[index] = updatedCustomer;
      }
      return { ...state, customers };
    }

    //worked
    case "ADD PRODUCT": {
      return {
        ...state,
        products: [...state.products, {...action.payload }],
      };
    }
    
    //worked
    case "DELETE PRODUCT": {
      const products = [...state.products];
      const productIdToDelete = action.payload;
      const purchases = [...state.purchases];
      const index = products.findIndex(
        (product) => product._id === productIdToDelete
      );
      if (index !== -1) {
        products.splice(index, 1);
        const purchWithoutProDel =
          purchases.length > 0
            ? purchases.map((purchase) =>
                purchase.productId === productIdToDelete
                  ? handleDeletePurchase(purchase._id)
                  : purchase
              )
            : null;
        if (purchWithoutProDel !== null) {
          return {
            ...state,
            products: products,
            purchases: purchWithoutProDel,
          };
        }
      }
      return { ...state, products };
    }

    case "UPDATE PRODUCT": {
      const products = [...state.products];
      const index = products?.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        const updatedProduct = { ...action.payload };
        products[index] = updatedProduct;
      }
      return { ...state, products };
    }

    case "ADD PURCHASE": {
      const { customerId, productId } = action.payload;
      console.log(customerId)
      const date = new Date().toISOString().slice(0, 10); // Get ISO date string (YYYY-MM-DD)
      // Create copies of arrays from state
      const products = [...state.products];
      const purchases = [...state.purchases];
      // Find the product by productId in the products array
      const productIndex = products?.findIndex(
        (product) => product._id === productId
      );
      if (productIndex !== -1) {
        if (products[productIndex].quantity > 0) {
          // Reduce the quantity of the product by 1
          const updatedProducts = [...products];
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            quantity: updatedProducts[productIndex].quantity - 1,
          };

          const newPurchase = {
            customerId: customerId,
            productId: productId,
            date: date,
          };

          const updatedPurchases = [...purchases, newPurchase];
          const addPurchaseDone = addPurchase(
            newPurchase,
            updatedProducts[productIndex]
          );
          if (addPurchaseDone) {
            return {
              ...state,
              products: updatedProducts,
              purchases: updatedPurchases,
            };
          }
        }
      }

      return state;
    }

    case "UPDATE PURCHASES": {
      const purchases = [...state.purchases];
      const index = purchases?.findIndex(
        (purchase) => purchase._id === action.payload._id
      );
      if (index !== -1) {
        purchases[index] = updatedPurchase;
      }
      return { ...state, purchases };
    }

    default:
      return state;
  }
};

export default rootReducer;
