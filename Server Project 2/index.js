const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./configs/db");
const customersController = require("./controllers/customersController");
const productsController = require("./controllers/productsController");
const purchasesController = require("./controllers/purchasesController");
const authController = require("./controllers/authController");

const app = express();
const PORT = process.env.PORT || 5001;

// Correctly resolve the path to the 'dist' directory
const distPath = path.resolve(__dirname, 'dist');

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

// Serve the main HTML file for all other routes
app.get("/*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Connect to MongoDB
connectDB();

// Setup CORS
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173" // Adjust this to your client URL
    })
);

app.use(express.json());

// Setup routes
app.use("/customers", customersController);
app.use("/products", productsController);
app.use("/purchases", purchasesController);
app.use("/auth", authController);

// Start server
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});