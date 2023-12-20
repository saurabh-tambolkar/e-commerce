import React,{useState} from "react"
import {useNavigate} from "react-router-dom"

const AddProduct=()=>{

    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [category,setCategory]=useState();
    const [company,setCompany]=useState();
    const navigate=useNavigate();

    const AddProduct=async()=>{
        const alertfunc=()=>{
            alert("Enter all details and try again");
        }
        if ( !name || !price || !category || !company) {
          console.log("Enter all details and try again");
          alertfunc();
        } 
        else{
            console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);
        let result = await fetch("http://localhost:5000/add-product",{
            method:"POST",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-type":"application/json"
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
        }
    }

    return(
        <div className="add-product">
            <div className="add">
            <h2>Add product</h2>
            <input type="text" autoComplete="off" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter name of product"/>
            <input type="text" autoComplete="off" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter price of product"/>
            <input type="text" autoComplete="off" name="category" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter category of product"/>
            <input type="text" autoComplete="off" name="company" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter company of product"/>
            <button onClick={AddProduct}>Add product</button>
            </div>
        </div>
    );
}
export default AddProduct;