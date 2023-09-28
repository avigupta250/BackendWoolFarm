const express=require('express');
const app=express();
const userRoutes=require("./routes/user")

require("dotenv").config();

const PORT=process.env.PORT || 4000;
// connect to the databse
const dbConnect=require("./config/database");
dbConnect();

app.use(express.json());



app.use("/api/v1",userRoutes);


// start server
app.listen(PORT,()=>{
    console.log(`Server started sucessfully at ${PORT}`);
})




// default ROute
app.get("/",(req,res)=>{
    res.send(`<h1>Home</h1>`);
})