import express from "express";
const app = express();
//app.get("/",(req,res)=>{
  // res.send("server is ready");
//});

const port = process.env.port || 3000;

//get a list of 5 jokes
app.get("api/jokes",(req,res)=>{
const jokes=[
    {
       id: 1,
    title: "Funny Student",
    content: "Teacher: Homework kahan hai? Student: Sir, homework ghar par hai!"
    },
    {
 id: 2,
    title: "Computer Joke",
    content: "Computer ko thand kyun lagti hai? Kyunki uski Windows khuli hain!"
    },
    {
id: 3,
    title: "Math Joke",
    content: "Math book sad kyun thi? Kyunki uske paas bahut saare problems the!"
    },
    {
id: 4,
    title: "Food Joke",
    content: "Tomato red kyun hua? Kyunki usne salad dressing dekhi!"
    },
    {
 id: 5,
    title: "Mobile Joke",
    content: "Mobile school kyun gaya? Apni calling improve karne!"
    }
];
res.send(jokes);
});


app.listen(port,() =>{
   console.log(`server running at ${port}`);
});