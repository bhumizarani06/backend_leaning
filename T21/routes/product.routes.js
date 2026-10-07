import express from "express";

const router = express.Router();

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        stock: 5
    },
    {
        id: 2,
        name: "Mobile",
        price: 25000,
        stock: 10
    },
    {
        id: 3,
        name: "Watch",
        price: 2200,
        stock: 15
    }
];


// GET all products
router.get("/", (req, res) => {
    const { minPrice, maxPrice, search } = req.query;

    let result = products;

    if (minPrice !== undefined) {
        const price = Number(minPrice);

        if (Number.isNaN(price) || price < 0) {
            return res.status(400).json({
                message: "Invalid minPrice"
            });
        }

        result = result.filter(
            product => product.price >= price
        );
    }

    if (maxPrice !== undefined) {
        const price = Number(maxPrice);

        if (Number.isNaN(price) || price < 0) {
            return res.status(400).json({
                message: "Invalid maxPrice"
            });
        }

        result = result.filter(
            product => product.price <= price
        );
    }

    if (search !== undefined) {
        result = result.filter(
            product =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
    }

    res.status(200).json(result);
});

// GET single product
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});


// POST create product
router.post("/", (req, res) => {
    const { name, price, stock } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number" ||
        price < 0 ||
        typeof stock !== "number" ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    const newId = products.length
        ? Math.max(...products.map(item => item.id)) + 1
        : 1;

    const newProduct = {
        id: newId,
        name: name.trim(),
        price,
        stock
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});


// PUT full update
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, stock } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number" ||
        price < 0 ||
        typeof stock !== "number" ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    product.name = name.trim();
    product.price = price;
    product.stock = stock;

    res.status(200).json(product);
});


// PATCH partial update
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, stock } = req.body;

    if (
        name === undefined &&
        price === undefined &&
        stock === undefined
    ) {
        return res.status(400).json({
            message: "At least one field is required"
        });
    }

    if (
        name !== undefined &&
        (typeof name !== "string" || name.trim() === "")
    ) {
        return res.status(400).json({
            message: "Invalid name"
        });
    }

    if (
        price !== undefined &&
        (typeof price !== "number" || price < 0)
    ) {
        return res.status(400).json({
            message: "Invalid price"
        });
    }

    if (
        stock !== undefined &&
        (
            typeof stock !== "number" ||
            !Number.isInteger(stock) ||
            stock < 0
        )
    ) {
        return res.status(400).json({
            message: "Invalid stock"
        });
    }

    if (name !== undefined) {
        product.name = name.trim();
    }

    if (price !== undefined) {
        product.price = price;
    }

    if (stock !== undefined) {
        product.stock = stock;
    }

    res.status(200).json(product);
});


// DELETE product
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        item => item.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(productIndex, 1);

    res.status(204).send();
});


export default router;