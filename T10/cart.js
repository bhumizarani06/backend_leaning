const products = {
    apple: 50,
    milk: 60,
    bread: 40
};

function calculatePrice(price, quantity) {
    if (typeof price !== "number" || Number.isNaN(price)) {
        throw new Error("Price must be a valid number");
    }

    if (price <= 0) {
        throw new Error("Price must be greater than 0");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Quantity must be a positive integer");
    }

    return price * quantity;
}

function calculateCartTotal(items) {
    if (!Array.isArray(items)) {
        throw new Error("Cart must be an array");
    }

    if (items.length === 0) {
        return 0;
    }

    let total = 0;

    for (const item of items) {
        if (!products[item.product]) {
            throw new Error(`Unknown product: ${item.product}`);
        }

        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
            throw new Error("Quantity must be a positive integer");
        }

        total += products[item.product] * item.quantity;
    }

    return total;
}

export {
    calculatePrice,
    calculateCartTotal
};