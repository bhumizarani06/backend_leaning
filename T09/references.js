function createCart() {
  const items = [];

  return {
    addItem(item) {
      items.push(item);
    },

    removeItem(productId) {
      const index = items.findIndex(
        item => item.productId === productId
      );

      if (index !== -1) {
        items.splice(index, 1);
      }
    },

    getItems() {
        return items.map(item => ({ ...item }));

    }
  };
}

const cart = createCart();

cart.addItem({
  productId: 1,
  name: "Laptop",
  quantity: 1
});

console.log("Cart items:", cart.getItems());

const cart1 = createCart();
const cart2 = createCart();
cart1.addItem(
    {
    productId: 2,
  name: "mobile",
  quantity: 4
    }
);

cart2.addItem(
    {
    productId: 3,
  name: "watch",
  quantity: 6
    }
);
console.log("cart1:",cart1.getItems());
console.log("cart2:",cart2.getItems());

const cart1items = cart1.getItems();

cart1items.push({
    productId: 5,
  name: "mouse",
  quantity: 3
});

console.log(cart1.getItems());

const externalItems = cart1.getItems();

externalItems.push({
  productId: 99,
  name: "Hacked Product",
  quantity: 1
});

console.log("Cart 1 after external mutation:", cart1.getItems());

const copiedItems = cart1.getItems();

copiedItems[0].quantity = 100;

console.log("Cart 1 after nested mutation:", cart1.getItems());

function addQuantity(item, amount) {
  return {
    ...item,
    quantity: item.quantity + amount
  };
}

const originalItem = {
  productId: 10,
  name: "Keyboard",
  quantity: 2
};

const updatedItem = addQuantity(originalItem, 3);

console.log("Original item:", originalItem);
console.log("Updated item:", updatedItem);