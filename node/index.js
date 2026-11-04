const express = require("express");
require("dotenv").config();
const app= express()
const port = 3000

app.get("/",(req,res)=>{
    res.send("hello world")
});

app.get("/twitter",(req,res) =>{
    res.send("hii i am using express");
});

app.get("/login",(req,res) =>{
    res.send("<h1>hii i am using express login</h1>");
});

app.listen(process.env.port,()=>{
    console.log("server is running");
});
