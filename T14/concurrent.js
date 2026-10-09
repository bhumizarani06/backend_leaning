// T14 - Concurrent independent work

function loadCustomers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Customers loaded");
      resolve(["Bhumi", "Prerna", "Sonal"]);
    }, 2000);
  });
}

function loadProducts() {
  return new Promise((resolve) => {                    
    setTimeout(() => {
      console.log("Products loaded");
      resolve(["Rice", "Dal", "Bread"]);
    }, 3000);
  });
}

async function main() {
  console.time("concurrent");

  console.log("Starting customer and product loading...");

  const [customers, products] = await Promise.all([
    loadCustomers(),
    loadProducts()
  ]);

  console.log("Customers:", customers);
  console.log("Products:", products);

  console.timeEnd("concurrent");
}

main();