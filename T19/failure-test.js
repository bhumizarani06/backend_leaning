const { Readable, Transform, Writable, pipeline } = require("stream");

function* generateProducts(count) {
    for (let i = 1; i <= count; i++) {
        yield {
            id: i,
            name: `Product ${i}`,
            price: i * 10
        };
    }
}

const productStream = Readable.from(
    generateProducts(1000)
);

const csvTransform = new Transform({
    objectMode: true,

    transform(product, encoding, callback) {
        const row =
            `${product.id},` +
            `${product.name},` +
            `${product.price}\n`;

        callback(null, row);
    }
});

let rowsWritten = 0;

const failingDestination = new Writable({
    write(chunk, encoding, callback) {
        rowsWritten++;

        if (rowsWritten === 100) {
            callback(new Error("Simulated destination failure"));
            return;
        }

        callback();
    }
});

productStream.once("close", () => {
    console.log("Readable stream closed.");
});

csvTransform.once("close", () => {
    console.log("Transform stream closed.");
});

failingDestination.once("close", () => {
    console.log("Destination stream closed.");
});

pipeline(
    productStream,
    csvTransform,
    failingDestination,
    (error) => {
        if (error) {
            console.log("Pipeline failed:", error.message);
            console.log("Rows attempted:", rowsWritten);

            console.log(
                "Readable destroyed:",
                productStream.destroyed
            );

            console.log(
                "Transform destroyed:",
                csvTransform.destroyed
            );

            console.log(
                "Destination destroyed:",
                failingDestination.destroyed
            );

            console.log("Cleanup completed.");
        } else {
            console.log("Pipeline completed successfully.");
        }
    }
);