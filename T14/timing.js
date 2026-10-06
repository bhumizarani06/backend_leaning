// T14 - Sequential vs Concurrent timing

function loadCustomers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Customers loaded");
    }, 2000);
  });
}

function loadProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Products loaded");
    }, 3000);
  });
}

// Sequential
async function sequential() {
  console.time("Sequential");

  const customers = await loadCustomers();
  console.log(customers);

  const products = await loadProducts();
  console.log(products);

  console.timeEnd("Sequential");
}

// Concurrent
async function concurrent() {
  console.time("Concurrent");

  const [customers, products] = await Promise.all([
    loadCustomers(),
    loadProducts()
  ]);

  console.log(customers);
  console.log(products);

  console.timeEnd("Concurrent");
}

async function main() {
  await sequential();

  console.log("--------------------");

  await concurrent();
}

main();