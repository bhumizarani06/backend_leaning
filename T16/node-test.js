//console.log("node-js javascript");
//console.log(typeof document);

//console.log("Node.js runtime");

//console.log("Node version:", process.version);

import fs from "node:fs";

fs.writeFileSync("test.txt", "Hello from Node.js");

console.log("File created");