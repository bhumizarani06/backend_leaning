const { Readable } = require("stream");

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

const productGenerator = generateProducts(10);

const productStream = Readable.from(productGenerator);

productStream.on("data", (product) => {
    console.log(product);
});

productStream.on("end", () => {
    console.log("Product stream completed.");
});

productStream.on("error", (error) => {
    console.log("Stream error:", error.message);
});