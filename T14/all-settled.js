// T14 - Promise.allSettled()

function loadCustomers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Bhumi", "Prerna"]);
    }, 2000);
  });
}

function loadProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Product service failed"));
    }, 1000);
  });
}

function loadOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Order-101", "Order-102"]);
    }, 3000);
  });
}

async function main() {
  const results = await Promise.allSettled([
    loadCustomers(),
    loadProducts(),
    loadOrders()
  ]);

  console.log("All results:");

  console.log(results);
}

main();