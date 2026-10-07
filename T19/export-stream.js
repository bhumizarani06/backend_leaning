const fs = require("fs");
const { Readable, Transform, pipeline } = require("stream");

function* generateProducts(count) {
    for (let i = 1; i <= count; i++) {
        yield {
            id: i,
            name: `Product ${i}`,
            category: i % 2 === 0 ? "Electronics" : "Home",
            price: i * 10,
            quantity: i + 5
        };
    }
}

const productGenerator = generateProducts(1000);

const productStream = Readable.from(productGenerator);

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

const output = fs.createWriteStream("output.csv");

output.on("finish", () => {
    console.log("Export completed successfully.");
});

pipeline(
    productStream,
    csvTransform,
    output,
    (error) => {
        if (error) {
            console.log("Export failed:", error.message);
        }
    }
);