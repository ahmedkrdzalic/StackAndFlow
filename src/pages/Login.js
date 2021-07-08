import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Redirect, Link } from "react-router-dom";
import { ENVContext } from "../ENVContext"

import axios from "axios"


export function Login() {
  const { env } = useContext(ENVContext);
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login_func = async (e) => {
    e.preventDefault();

    if(!validate()){
        return;
    }

    const response = await fetch(env + '/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
    });
    const content = await response.json();
    setUser(content);
  }

  const validate = () => {
    if (email=="" || password==""){
        return false;  
    }else if(password.length<5){
        alert("Password has to be at least 5 characters");
        return false;  
    }else{
        return true;
    }
  }



  if(user){
  return <Redirect to="/"/>;
  }

  return (
    <div>
      <main className="form-signin">
            <form>
                <h1 className="h3 mb-3 fw-normal">Please log in</h1>
                <input type="email" className="form-control" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" onClick={login_func}>log in</button>
            </form>
      </main>
    </div>
  );
}
