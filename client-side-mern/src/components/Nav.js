import React from "react";
import { Link,useNavigate } from "react-router-dom";

const Nav=()=>{{
    
    const auth = localStorage.getItem("user");
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem('user');
        navigate("/signup");  //navigate re-renders the UI component if there is a single change
    }

    return(
        <div className="nav">
            {
            auth ? 
            <ul style={{height:"40px",paddingTop:"10px"}}>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                {/* <li><Link to="/update">Update Products</Link></li> */}
                <li><Link to="/profile">Profile </Link></li>
                <li><Link to="/signup" onClick={logout}>Logout [{JSON.parse(auth).name}]  </Link></li> :
                                                         {/*             |         */}
                                                {/* converting to json by JSON.parse */}
            </ul> :
            <ul style={{height:"15px",paddingBottom:"40px",textAlign:"right"}}>
                <li><Link to="/signup">Sign Up </Link></li>
                <li><li><Link to="/login">Login </Link></li></li>    
            </ul>

            }
        </div>
    )
}
}

export default Nav