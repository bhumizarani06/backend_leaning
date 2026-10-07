const fs = require("fs");

const writable = fs.createWriteStream("backpressure-output.txt");

let canContinue = true;

for (let i = 1; i <= 100000; i++) {
    canContinue = writable.write(`Product ${i}\n`);

    if (!canContinue) {
        console.log("Backpressure detected at product:", i);
        break;
    }
}

writable.end();

writable.on("finish", () => {
    console.log("Writing completed.");
});