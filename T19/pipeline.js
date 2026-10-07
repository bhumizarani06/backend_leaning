const fs = require("fs");
const {pipeline} = require("stream");

const readable = fs.createReadStream("input.txt","utf-8");

const writable = fs.createWriteStream("pipeline-output.txt");

pipeline(readable,writable,(error)=>
{
  if(error){
    console.log("pipeline failed:",error.message);
  }
  else{
    console.log("pipeline completed succesfully");
  }
});