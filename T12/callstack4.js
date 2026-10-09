import { startTransition } from "react";

console.log("start");

setTimeout(() =>
{
  console.log("timer");
},0);

Promise.resolve().then(() =>
{
  console.log("promise");
});

console.log("end");
