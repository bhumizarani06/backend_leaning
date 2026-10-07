const { readFile, writeFile } = require("fs").promises;

const FILE = "./products.json";

async function readProducts() {
    const data = await readFile(FILE, "utf-8");
    return JSON.parse(data);
}

async function saveProducts(products) {
    await writeFile(
        FILE,
        JSON.stringify(products, null, 2),
        "utf-8"
    );
}

async function listProducts() {
    const products = await readProducts();

    if (products.length === 0) {
        console.log("No products found.");
        return;
    }

    console.log("\nProducts:");

    for (const product of products) {
        console.log(
            `${product.id}. ${product.name} - ₹${product.price} - Stock: ${product.stock}`
        );
    }
}

async function findProduct(id) {
    const products = await readProducts();

    const product = products.find(
        (item) => item.id === id
    );

    if (!product) {
        console.log("Product not found.");
        return;
    }

    console.log("\nProduct found:");
    console.log(`ID: ${product.id}`);
    console.log(`Name: ${product.name}`);
    console.log(`Price: ₹${product.price}`);
    console.log(`Stock: ${product.stock}`);
}

async function addProduct(name, price, stock) {
    const products = await readProducts();

    const newProduct = {
        id: products.length === 0
            ? 1
            : Math.max(...products.map((product) => product.id)) + 1,

        name,
        price,
        stock
    };

    products.push(newProduct);

    await saveProducts(products);

    console.log("Product added successfully.");
    console.log(newProduct);
}

async function main() {
    const command = process.argv[2];

    try {
        if (command === "list") {
            await listProducts();
            return;
        }

        if (command === "find") {
            const id = Number(process.argv[3]);

            if (!Number.isInteger(id)) {
                console.log("Product ID must be a number.");
                return;
            }

            await findProduct(id);
            return;
        }

        if (command === "add") {
            const name = process.argv[3];
            const price = Number(process.argv[4]);
            const stock = Number(process.argv[5]);

            if (!name) {
                console.log("Product name is required.");
                return;
            }

            if (!Number.isFinite(price) || price < 0) {
                console.log("Price must be a valid positive number.");
                return;
            }

            if (!Number.isInteger(stock) || stock < 0) {
                console.log("Stock must be a non-negative integer.");
                return;
            }

            await addProduct(name, price, stock);
            return;
        }

        console.log("Unknown command.");
        console.log("\nAvailable commands:");
        console.log("node product-cli.js list");
        console.log("node product-cli.js find <id>");
        console.log("node product-cli.js add <name> <price> <stock>");

    } catch (error) {
        console.log("CLI error:", error.message);
    }
}

main();