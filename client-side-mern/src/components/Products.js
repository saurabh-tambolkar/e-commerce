import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState();
  const navigate=useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await fetch("http://localhost:5000/products");
    setProducts(await data.json());
  };

  // console.log(products);

  const deleteProduct=async(id)=>{
    console.log(id)
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      method:'DELETE'
    });
    result = await result.json();
    if(result){
      alert("product deleted");
      getProducts();
    }
  }

  const searchHandler=async(e)=>{
    let key=e.target.value;
    let url=`http://localhost:5000/search/${key}`;
    let result = await fetch(url);
    result =await result.json();
    if(result){
      setProducts(result);
    }
    else{
      getProducts();
    }
  }

  return (
    <div className="products">
      <h2 style={{marginTop:"20px"}}>Products list</h2>
      <input className="search-box" onChange={searchHandler} type="text" placeholder="Search products" />
      <ul>
        <li><b>S. No.</b></li>
        <li><b>Name</b></li>
        <li><b>Price</b></li>
        <li><b>Category</b></li>
        <li><b>Company</b></li>
        <li><b>Operation</b></li>
      </ul>
    { 
    products && products.length > 0 ? (
        products.map((product,index) => (
            <ul key={product._id}>
                {/* <li>{array.indexOf(product.name)}</li> */}
                <li>{index+1}</li>
                <li>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.category}</li>
                <li>{product.company}</li>
                <li>
                  <button onClick={()=>deleteProduct(product._id)} style={{backgroundColor:'red',borderRadius:"5px",width:"7vh",fontSize:'10px'}}><b>DELETE</b></button>
                  <button onClick={()=>navigate("/product/"+product._id)} style={{backgroundColor:'skyblue',borderRadius:"5px",marginLeft:"2px",width:"7vh",fontSize:'10px'}}><b>UPDATE</b></button>
                </li>
            </ul>
        ))
     ) : <h2>"no products"</h2>
    }

        
    </div>
  );
};
export default Products;
