const fs = require("fs");
const readable = fs.createReadStream("input.txt","utf-8");

const writable = fs.createWriteStream("output.txt");
readable.on("data",(chunk) =>
{
    console.log("received chunk:");
    console.log(chunk);
    writable.write(chunk);
});

readable.on("end", () => {
    console.log("Reading completed.");
    writable.end();
});

readable.on("error", (error) => {
    console.log("Read error:", error.message);
});

writable.on("finish", () => {
    console.log("Writing completed.");
});