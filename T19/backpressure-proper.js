const fs = require("fs");

const writable = fs.createWriteStream("backpressure-proper-output.txt");

let i = 1;

function writeData() {
    while (i <= 100000) {
        const canContinue = writable.write(`Product ${i}\n`);

        i++;

        if (!canContinue) {
            console.log("Backpressure detected. Waiting for drain...");
            writable.once("drain", writeData);
            return;
        }
    }

    writable.end();
}

writable.on("finish", () => {
    console.log("All products written successfully.");
});

writeData();