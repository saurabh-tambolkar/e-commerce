import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.log(name, email, password);
    const alertfunc=()=>{
        alert("Enter all details and try again");
    }
    if (!name || !email || !password) {
      console.log("Enter all details and try again");
      alertfunc();
    } else {
      const result = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }), //js object to json object
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await result.json(); //result is converted to json for data ---- firstly result in js obj and then it is json object
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data)); //storing in localstorage
      if (data) {
        navigate("/");
      }
    }
  };

  return (
    <div className="signUpPage">
      <div className="signup">
        <h2>
          <b>Register</b>
        </h2>
        <input
          autoComplete="off"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Enter your name"
        />
        <input
          autoComplete="off"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Enter your email"
        />
        <input
          autoComplete="off"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter your password"
        />
        <button type="button" onClick={collectData}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
