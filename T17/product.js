/*
import fs from "node:fs/promises";

const filePath = "./products.json";

async function saveProducts() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000
    },
    {
      id: 2,
      name: "Mouse",
      price: 1000
    }
  ];

  await fs.writeFile(
    filePath,
    JSON.stringify(products, null, 2),
    "utf8"
  );

  console.log("Products saved successfully");
}

async function loadProducts() {
  const data = await fs.readFile(filePath, "utf8");

  const products = JSON.parse(data);

  console.log("Products:");
  console.log(products);
}

await saveProducts();
await loadProducts();
*/
//import fs from "node:fs/promises";

//console.log("File System practice started");

/*
import fs from "node:fs/promises";
import path from "node:path";

console.log("Working directory:", process.cwd());

const dataDirectory = path.resolve("data");

const filePath = path.join(
  dataDirectory,
  "products.json"
);

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },
  {
    id: 2,
    name: "Mouse",
    price: 1000
  }
];

await fs.mkdir(dataDirectory, { recursive: true });

await fs.writeFile(
  filePath,
  JSON.stringify(products, null, 2),
  "utf8"
);

console.log("Products saved successfully");
console.log("File path:", filePath);

const data = await fs.readFile(
  filePath,
  "utf8"
);

const loadedProducts = JSON.parse(data);

console.log("Loaded products:");
console.log(loadedProducts);

*/
/*

import fs from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.resolve("data");

const filePath = path.join(
  dataDirectory,
  "products.json"
);

async function loadProducts() {
  try {
    const data = await fs.readFile(
      filePath,
      "utf8"
    );

    const products = JSON.parse(data);

    return products;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Products file not found.");
      console.log("Creating empty products file...");

      await fs.mkdir(
        dataDirectory,
        { recursive: true }
      );

      await fs.writeFile(
        filePath,
        "[]",
        "utf8"
      );

      return [];
    }

    throw error;
  }
}

const products = await loadProducts();

console.log("Products:");
console.log(products);
*/


import fs from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.resolve("data");

const filePath = path.join(
  dataDirectory,
  "products.json"
);

async function loadProducts() {
  try {
    const data = await fs.readFile(
      filePath,
      "utf8"
    );

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Products file not found.");
      console.log("Creating empty products file...");

      await fs.mkdir(
        dataDirectory,
        { recursive: true }
      );

      await fs.writeFile(
        filePath,
        "[]",
        "utf8"
      );

      return [];
    }

    throw error;
  }
}

//async function saveProducts(products) {
  //await fs.writeFile(
    //filePath,
    //JSON.stringify(products, null, 2),
    //"utf8"
  //);
//}
async function saveProducts(products) {
  const tempFilePath = `${filePath}.tmp`;

  await fs.writeFile(
    tempFilePath,
    JSON.stringify(products, null, 2),
    "utf8"
  );

  await fs.rename(
    tempFilePath,
    filePath
  );
}

async function addProduct(name, price) {
  if (!name) {
    console.log("Product name is required.");
    return;
  }

  if (!price) {
    console.log("Product price is required.");
    return;
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    console.log("Product price must be a number.");
    return;
  }

  if (numericPrice <= 0) {
    console.log("Product price must be greater than 0.");
    return;
  }

  const products = await loadProducts();

  const newProduct = {
    id: products.length + 1,
    name: name,
    price: numericPrice
  };

  products.push(newProduct);

  await saveProducts(products);

  console.log("Product added successfully.");
  console.log(newProduct);
}

async function listProducts() {
  const products = await loadProducts();

  console.log("Products:");
  console.log(products);
}

const command = process.argv[2];

if (command === "add-product") {
  const name = process.argv[3];
  const price = process.argv[4];

  await addProduct(name, price);
} else if (command === "list-products") {
  await listProducts();
} else {
  console.log("Unknown command.");
  console.log("Use:");
  console.log("node product.js add-product <name> <price>");
  console.log("node product.js list-products");
}