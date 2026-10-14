
const users = require("./data/users.json");
const products = require("./data/products.json");
const orders = require("./data/orders.json");

for (const user of users) {
  if (!user._id || !user.name || !user.email) {
    throw new Error("User is missing a required field");
  }
}


for (const product of products) {
  if (
    !product._id ||
    !product.name ||
    product.price < 0 ||
    product.stock < 0
  ) {
    throw new Error("Product has invalid data");
  }
}


for (const order of orders) {
  const userExists = users.some(
    user => user._id === order.customerId
  );

  if (!userExists) {
    throw new Error(`Customer not found for order ${order._id}`);
  }

  
  for (const item of order.items) {
    const productExists = products.some(
      product => product._id === item.productId
    );

    if (!productExists) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (item.quantity <= 0 || item.priceAtPurchase < 0) {
      throw new Error(`Invalid item in order ${order._id}`);
    }
  }

  
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  if (calculatedTotal !== order.total) {
    throw new Error(`Incorrect total for order ${order._id}`);
  }
}

console.log("All schema validation checks passed!");
