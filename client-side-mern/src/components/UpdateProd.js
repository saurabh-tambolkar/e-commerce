import React,{useEffect, useState} from "react"
import {useNavigate,useParams} from "react-router-dom"

const UpdateProd=()=>{

    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [category,setCategory]=useState();
    const [company,setCompany]=useState();
    const navigate=useNavigate();
    let params = useParams();
    
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        let url = "http://localhost:5000/product/" + params.id;
        // console.log(params);
        // console.log(url);
        let result = await fetch(url);
        result =await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category)
        setCompany(result.company)
    }
    
    const UpdateProduct=async()=>{
        let url = "http://localhost:5000/product/" + params.id;
        let result = await fetch(url,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "content-type":"application/json"
            }
        })
        result = await result.json();
        console.log(result);
        if(result){
            console.log("product updated successfully");
            alert("updated successfully!")
            navigate("/")
        }
        else{
            alert("cant update right now")
        }
    }
    

    return(
        <div className="update-product">
            <div className="update">
            <h2 style={{margin:"10px"}}>Update product</h2>
            <input type="text" autoComplete="off" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter name of product"/>
            <input type="text" autoComplete="off" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter price of product"/>
            <input type="text" autoComplete="off" name="category" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter category of product"/>
            <input type="text" autoComplete="off" name="company" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter company of product"/>
            <button onClick={UpdateProduct}>Update product</button>
            </div>
        </div>
    );
}
export default UpdateProd;