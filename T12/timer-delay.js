console.log("start");

setTimeout(() => {
    console.log("time executed");

},0)

const start = Date.now();

while(Date.now() - start < 3000){

}
console.log("loop finished");


