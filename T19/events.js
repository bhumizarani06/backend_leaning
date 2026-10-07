const EventEmitter = require("events");

const emitter = new EventEmitter();

function onMessage(message){
    console.log("message:",message);
}

emitter.on("message",onMessage);
emitter.emit("message","hello");
emitter.emit("message","Node.js");

console.log("removing listener");

emitter.removeListener("message",onMessage);
emitter.emit("message","this should not print");
