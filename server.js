const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const app = express()


app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// Define routes here
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

mongoose.connect("mongodb+srv://sainath47:16oct1996@saicluster2.kzyf6n0.mongodb.net/rannlab").then(
  (e)=>  console.log("mongoDB connected")
).catch(e=> console.log(e))


app.listen(port ,()=>{
console.log(`app listening at ${port}`);
})