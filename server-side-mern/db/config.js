const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/e-commerce").then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);
});