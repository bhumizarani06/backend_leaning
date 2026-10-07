const EventEmitter =  require("events");

const emitter = new EventEmitter();

emitter.once("start",() =>{
    console.log("start event handled")
});

emitter.emit("start");
emitter.emit("start");
emitter.emit("start");