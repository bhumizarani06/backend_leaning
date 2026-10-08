import express from "express";
import crypto from "node:crypto";

const app = express();

const PORT = 5000;

const products = [];

// app.use((req, res, next) => {

//     if (
//         req.method === "POST" ||
//         req.method === "PUT" ||
//         req.method === "PATCH"
//     ) {
//         if (!req.is("application/json")) {
//             return res.status(415).json({
//                 error: "Content-Type must be application/json",
        
//             });
//         }
//     }

//     next();
// });

app.use((req, res, next) => {
    const requestId = crypto.randomUUID();

    req.requestId = requestId;

    res.setHeader("X-Request-ID", requestId);

    const Time = Date.now();

    res.on("finish", () => {
        const DATETIME = Date.now() - Time;

        console.log(
            `[${requestId}] ${req.method} ${req.originalUrl} ${DATETIME}ms`
        );

      
    });
      next();
});

app.use(express.json({ limit: "10kb" }));


function validateProduct(req, res, next) {
    console.log("Start method validateProduct..........................")
    const { name, price, stock } = req.body;

    const allowedFields = ["name", "price", "stock"];

    const unknownFields = Object.keys(req.body).filter(
        (field) => !allowedFields.includes(field)
    );

    
    if (unknownFields.length > 0) {
        return res.status(400).json({
            error: "Unsupported fields",
            fields: unknownFields,
            
        });
    }

    
    if (
        typeof name !== "string" ||
        name.trim().length < 2
    ) {
        return res.status(400).json({
            error: "Name must be a string with at least 2 characters",
            
        });
    }

    
    if (
        typeof price !== "number" ||
        price < 0
    ) {
        return res.status(400).json({
            error: "Price must be a non-negative number",
        
        });
    }

    
    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        return res.status(400).json({
            error: "Stock must be a non-negative integer",
        
        });
    }

    next();
}



app.get("/", (req, res) => {
    res.json({
        message: "T22 Middleware API is running",
        
    });
});


app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({
            error: "syntax error",
           
        });
    }

    next(err);
});




app.post("/product", validateProduct, (req, res) => {

    console.log("Start method..........................");
    const { name, price, stock } = req.body;

    const product = {
        id: products.length + 1,
        name: name.trim(),
        price,
        stock
    };

    products.push(product);

    res.status(201).json({
        message: "Product created successfully",
        product,
    
    });
});



app.put("/product/:id", validateProduct, (req, res) => {
    const productId = Number(req.params.id);

    const product = products.find(
        (product) => product.id === productId
    );

    if (!product) {
        return res.status(404).json({
            error: "Product not found",
            
        });
    }

    const { name, price, stock } = req.body;

    product.name = name.trim();
    product.price = price;
    product.stock = stock;

    res.json({
        message: "Product updated successfully",
        product
      
    });
});



app.get("/products", (req, res) => {
    res.json({
        products
    });
});



app.listen(PORT, () => {
    console.log(`Server running is ${PORT}` );
});