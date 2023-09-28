const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("DB Connection successful"))
    .catch((err)=>{
        console.log("Issue in Db Connection");
        console.log(err.message);
        process.exit(1);
    });
}

module.exports=dbConnect;