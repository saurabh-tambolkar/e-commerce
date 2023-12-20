const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: [ "Please provide your name"] },
    email:{type :String , unique :true ,required :[ "Please provide an Email address"]},
    password :{type:String,requried:["Please enter password"]}
});

module.exports = mongoose.model("users",userSchema);