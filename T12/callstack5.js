console.log("A");

setTimeout(() =>
{
    console.log("B");
},0
);

Promise.resolve().then(() =>{
    console.log("C");
}
);

console.log("D");

Promise.resolve().then(() =>{ 
}
);

    console.log("E");                       
setTimeout(() =>
{
    console.log("F");
},0
);

