import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{

    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/signup")
        }
    })

    const loginHandle=async()=>{
        if(!email || !password){
            setError(true);
            return false;
        }
        console.log(email,password);
        let result = await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-type":"application/json"
            }
        })
        result = await result.json();
        console.log(result);
        if(result.name){
            console.log("logged in successfully")
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/")
        }
        else{
            alert("no user found");
            console.log("no user found");
        }
        
    }

    return(
        <div className="loginPage">
            <div className="login">
            <h2>Login</h2>
            <div>
            <input name="" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter email"/>
            {error && !email && <span className="login-error-span" style={{display:"flex"}}>Enter valid email</span>}
            </div>
            <div>
            <input name="" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password"/>
            {error && !password && <span className="login-error-span" style={{display:"flex"}}>Enter valid password</span>}
            </div>
            <button onClick={loginHandle} type="button">Log In</button>
            </div>
        </div>
    )
}
export default Login;