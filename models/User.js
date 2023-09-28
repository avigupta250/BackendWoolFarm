const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Farmer", "WarehouseManager", "Buyer"],
        required: true,
      },
   
    image: {
        type: String,
        // requird: true
    },
    token: {
        type: String,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Profile",
    },

})

module.exports = mongoose.model("User", userSchema);