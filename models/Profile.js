const mongoose = require("mongoose");
const { schema } = require("./User");


const profileSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
       
    },
    gender: {
        type: String,
       
    },
   
    dateOfBirth: {
        type: String,

    },
    city: {
        type: String,
        

    },
    pinCode: {
        type: Number,
        
    },
    state: {
        type: String,
      
    },
    country: {
        type: String,
        
    }
});


    module.exports=mongoose.model("Profile",profileSchema);