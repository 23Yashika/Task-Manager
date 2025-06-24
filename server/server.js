import express from "express"
const app = express();

app.get("/",(req,res)=>{
    res.status(200).send("welcome to express");
})
app.listen(3000);