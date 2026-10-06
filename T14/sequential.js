// T14 - Sequential dependent work

function loadCustomer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Customer loaded");
      resolve({ id: 101, name: "Bhumi" });
    }, 2000);
  });
}

function loadOrders(customerId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Orders loaded for customer ${customerId}`);
      resolve(["Order-101", "Order-102"]);
    }, 2000);
  });
}

async function main() {
  console.log("Starting...");

  const customer = await loadCustomer();

  console.log("Customer ID:", customer.id);

  const orders = await loadOrders(customer.id);

  console.log("Orders:", orders);

  console.log("Done");
}

main();