
const express = require("express");

const app = express();
const PORT = 3000;

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 50;

const ALLOWED_SORT_FIELDS = ["id", "name", "price"];
const ALLOWED_SORT_ORDERS = ["asc", "desc"];
const ALLOWED_CATEGORIES = ["Electronics", "Accessories"];

const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000, stock: 5 },
    { id: 2, name: "Mobile", category: "Electronics", price: 25000, stock: 0 },
    { id: 3, name: "Watch", category: "Accessories", price: 2200, stock: 15 },
    { id: 4, name: "Mouse", category: "Accessories", price: 500, stock: 10 },
    { id: 5, name: "Keyboard", category: "Accessories", price: 1500, stock: 0 },
    { id: 6, name: "Tablet", category: "Electronics", price: 18000, stock: 4 },
    { id: 7, name: "Headphones", category: "Electronics", price: 2200, stock: 8 }
];


app.get("/products", (req, res) => {
    const pageInput = req.query.page ?? "1";
    const limitInput = req.query.limit ?? String(DEFAULT_LIMIT);

    if (
        typeof pageInput !== "string" ||
        !/^\d+$/.test(pageInput) ||
        !Number.isSafeInteger(Number(pageInput)) ||
        Number(pageInput) < 1
    ) {
        return res.status(400).json({
            success: false,
            message: "page must be a positive integer"
        });
    }

    if (
        typeof limitInput !== "string" ||
        !/^\d+$/.test(limitInput) ||
        !Number.isSafeInteger(Number(limitInput)) ||
        Number(limitInput) < 1
    ) {
        return res.status(400).json({
            success: false,
            message: "limit must be a positive integer"
        });
    }

    const page = Number(pageInput);
    const limit = Math.min(Number(limitInput), MAX_LIMIT);

    const sortBy = req.query.sortBy ?? "price";
    const order = req.query.order ?? "asc";

    if (
        typeof sortBy !== "string" ||
        !ALLOWED_SORT_FIELDS.includes(sortBy)
    ) {
        return res.status(400).json({
            success: false,
            message: "Unsupported sort field"
        });
    }

    if (
        typeof order !== "string" ||
        !ALLOWED_SORT_ORDERS.includes(order)
    ) {
        return res.status(400).json({
            success: false,
            message: "order must be asc or desc"
        });
    }

    const { category, available, minPrice, maxPrice } = req.query;

    if (
        category !== undefined &&
        (
            typeof category !== "string" ||
            !ALLOWED_CATEGORIES.includes(category)
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Unsupported category"
        });
    }

    if (
        available !== undefined &&
        available !== "true" &&
        available !== "false"
    ) {
        return res.status(400).json({
            success: false,
            message: "available must be true or false"
        });
    }

    function parsePrice(value) {
        if (
            typeof value !== "string" ||
            value.trim() === "" ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0
        ) {
            return null;
        }

        return Number(value);
    }

    const minimum =
        minPrice === undefined ? undefined : parsePrice(minPrice);

    const maximum =
        maxPrice === undefined ? undefined : parsePrice(maxPrice);

    if (
        (minPrice !== undefined && minimum === null) ||
        (maxPrice !== undefined && maximum === null)
    ) {
        return res.status(400).json({
            success: false,
            message: "Prices must be non-negative numbers"
        });
    }

    if (
        minimum !== undefined &&
        maximum !== undefined &&
        minimum > maximum
    ) {
        return res.status(400).json({
            success: false,
            message: "minPrice cannot be greater than maxPrice"
        });
    }

    const filteredProducts = products.filter((product) => {
        if (category !== undefined && product.category !== category) {
            return false;
        }

        if (available === "true" && product.stock <= 0) {
            return false;
        }

        if (available === "false" && product.stock > 0) {
            return false;
        }

        if (minimum !== undefined && product.price < minimum) {
            return false;
        }

        if (maximum !== undefined && product.price > maximum) {
            return false;
        }

        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        let comparison;

        if (sortBy === "name") {
            comparison = a.name.localeCompare(b.name);
        } else {
            comparison = a[sortBy] - b[sortBy];
        }

        if (comparison !== 0) {
            return order === "asc" ? comparison : -comparison;
        }

        return a.id - b.id;
    });

    const offset = (page - 1) * limit;
    const items = sortedProducts.slice(offset, offset + limit);

    return res.json({
        success: true,
        data: items,
        pagination: {
            page,
            limit,
            totalItems: sortedProducts.length,
            totalPages: Math.ceil(sortedProducts.length / limit)
        },
        filters: {
            category: category ?? null,
            available: available ?? null,
            minPrice: minimum ?? null,
            maxPrice: maximum ?? null
        }
    });
});
app.get("/products/keyset", (req, res) => {
    const limitInput = req.query.limit ?? "2";
    const afterIdInput = req.query.afterId;

    const limit = Number(limitInput);
    const afterId =
        afterIdInput === undefined ? 0 : Number(afterIdInput);

    if (
        typeof limitInput !== "string" ||
        !/^\d+$/.test(limitInput) ||
        !Number.isSafeInteger(limit) ||
        limit < 1 ||
        limit > MAX_LIMIT
    ) {
        return res.status(400).json({
            success: false,
            message: "limit must be between 1 and 50"
        });
    }

    if (
        afterIdInput !== undefined &&
        (
            typeof afterIdInput !== "string" ||
            !/^\d+$/.test(afterIdInput) ||
            !Number.isSafeInteger(afterId) ||
            afterId < 0
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "afterId must be a non-negative integer"
        });
    }

    const matchingProducts = products
        .filter((product) => product.id > afterId)
        .sort((a, b) => a.id - b.id);

    const items = matchingProducts.slice(0, limit);
    const hasMore = matchingProducts.length > limit;

    const nextCursor =
        items.length > 0 ? items[items.length - 1].id : null;

    return res.json({
        success: true,
        data: items,
        pagination: {
            limit,
            nextCursor,
            hasMore
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});