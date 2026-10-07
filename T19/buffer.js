const text = "hello node.js";

const buffer = Buffer.from(text,"utf-8");

console.log("original text:",text);
console.log("buffer:",buffer);
console.log("buffer length:",buffer.length);
console.log("back to text:",buffer.toString("utf-8"));