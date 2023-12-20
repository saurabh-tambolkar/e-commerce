const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 5000;

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product")

app.use(express.json());
app.use(cors());


//register
app.get("/register",(req,res)=>{
    res.send("register route");
})
app.post("/register",async(req,res)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();
        
        res.status(200).send(result);
    }
    catch(err){
        res.status(404).send("cant register try again")
    }
})

//login
app.get("/login",(req,res)=>{
    res.send("login route");
})
app.post("/login",async(req,res)=>{
    console.log(req.body);
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }
        else{
            res.send("no user found,kindly register");
            console.log("no user found,kindly register");
            
        }
    }
    else{
        res.send("no user found,kindly register");
        console.log("no user found,kindly register");
    }
   
})

//add-products
app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.status(201).send(result);
})

//product
app.get("/products",async(req,res)=>{
    const products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }
    else{
        res.send({result:"no products found"});
    }
})

//delete-product
app.delete("/product/:id",async(req,res)=>{
    let result =await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

//update product
app.get("/product/:id",async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send("no result found")
    }
})
app.put('/product/:id',async(req,res)=>{
    let result = await Product.updateOne({_id:req.params.id},{$set:req.body});
    res.send(result);
    console.log(result);
})

//search
app.get('/search/:key',async(req,res)=>{
    let result = await Product.find({
        $or:[
        {
            name:{$regex:req.params.key}
        },
        {
            
            company:{$regex:req.params.key}
        },
        {
            category:{$regex:req.params.key}
        }
    ]
    })
    res.send(result)
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})