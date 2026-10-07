const fs = require("fs");
const { Readable, Transform, pipeline } = require("stream");
const { promisify } = require("util");

const pipelineAsync = promisify(pipeline);

const TOTAL_PRODUCTS = 100000;

function createProduct(i) {
    return {
        id: i,
        name: `Product ${i}`,
        category: i % 2 === 0 ? "Electronics" : "Home",
        price: i * 10,
        quantity: i + 5
    };
}

function memoryInMB() {
    return process.memoryUsage().heapUsed / 1024 / 1024;
}

function printMemory(label, memory) {
    console.log(`${label}: ${memory.toFixed(2)} MB`);
}

// ------------------------------
// ALL-IN-MEMORY VERSION
// ------------------------------

function allInMemory() {
    if (global.gc) {
        global.gc();
    }

    const startMemory = memoryInMB();

    const products = [];

    for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
        products.push(createProduct(i));
    }

    const afterMemory = memoryInMB();

    console.log("\n--- All-in-memory version ---");

    printMemory("Before creating products", startMemory);
    printMemory("After creating products", afterMemory);

    console.log(
        "Memory used by products:",
        (afterMemory - startMemory).toFixed(2),
        "MB"
    );

    return products;
}

// ------------------------------
// STREAMING VERSION
// ------------------------------

function* generateProducts(count) {
    for (let i = 1; i <= count; i++) {
        yield createProduct(i);
    }
}

async function streamingVersion() {
    if (global.gc) {
        global.gc();
    }

    const startMemory = memoryInMB();

    const productStream = Readable.from(
        generateProducts(TOTAL_PRODUCTS)
    );

    const csvTransform = new Transform({
        objectMode: true,

        transform(product, encoding, callback) {
            const row =
                `${product.id},` +
                `${product.name},` +
                `${product.category},` +
                `${product.price},` +
                `${product.quantity}\n`;

            callback(null, row);
        }
    });

    const output = fs.createWriteStream("streaming-output.csv");

    await pipelineAsync(
        productStream,
        csvTransform,
        output
    );

    if (global.gc) {
        global.gc();
    }

    const endMemory = memoryInMB();

    console.log("\n--- Streaming version ---");

    printMemory("Before streaming", startMemory);
    printMemory("After streaming", endMemory);

    console.log(
        "Memory change:",
        (endMemory - startMemory).toFixed(2),
        "MB"
    );
}

// ------------------------------
// RUN
// ------------------------------

async function main() {
    const products = allInMemory();

    // Remove the large array before streaming test
    console.log("\nRemoving all-in-memory array...");

    products.length = 0;

    if (global.gc) {
        global.gc();
    }

    await streamingVersion();

    console.log("\nMemory comparison completed.");
}

main().catch((error) => {
    console.log("Error:", error.message);
});