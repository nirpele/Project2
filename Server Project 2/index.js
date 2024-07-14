const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const customersController = require("./controllers/customersController");
const productsController = require("./controllers/productsController");
const purchasesController = require("./controllers/purchasesController");
const authController=require("./controllers/authController");

const app = express();
const PORT = 3000;

connectDB();

app.use(
  cors({ credentials: true, 
  origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/customers", customersController);
app.use("/products", productsController);
app.use("/purchases", purchasesController);
app.use("/auth", authController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
