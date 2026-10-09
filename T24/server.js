import express from "express";

import { AppError } from "./error/AppError.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestId } from "./middleware/requestId.js";

const app = express();
const PORT = 5000;


app.use(requestId);


app.use(express.json());

app.get("/", (req, res) => {
res.json({
message: "API is running",
requestId: req.requestId
});
});


app.get("/products/:id", (req, res) => {
const productId = Number(req.params.id);


if (productId === 1) {
    return res.json({
        id: 1,
        name: "Laptop",
        price: 50000
    });
}

throw new AppError(
    404,
    "PRODUCT_NOT_FOUND",
    "Product not found"
);


});


app.post("/products", (req, res) => {
const { name, price } = req.body;

if (!name || typeof price !== "number") {
    throw new AppError(
        400,
        "VALIDATION_ERROR",
        "Name and numeric price are required"
    );
}

return res.status(201).json({
    message: "Product created successfully",
    product: {
        id: 2,
        name,
        price
    },
    requestId: req.requestId
});


});


app.get("/test/server-error",(req,res) =>{
 throw new Error("database failure with private details");
});

app.get("/test/async-error",async (req,res) => {
    await Promise.reject(new Error
       ( "simulated async database fail")
    );
    res.json({message:"success"});
});

app.use(errorHandler);

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
