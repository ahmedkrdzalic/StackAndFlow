import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { ENVContext } from "../ENVContext"

import axios from "axios"

export function Register() {
  const { env } = useContext(ENVContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);


  const register_func = async (e) => {
    e.preventDefault();

    if(!validate()){
        return;
    }

    //https://stackandflow-backend.herokuapp.com/api
    const response = await fetch(env + 'register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            name,
            surname,
            email,
            password
        })
    });
    setRedirect(true);
  }

  if (redirect){
    return <Redirect to="/login"/>
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

  
  
  return (
  <div>
    <main className="form-signin">
          <form>
              <h1 className="h3 mb-3 fw-normal">Please register</h1>
              <input type="text" className="form-control" placeholder="Name" required
                  onChange={e => setName(e.target.value)}
              />

              <input type="text" className="form-control" placeholder="Surname" required
                  onChange={e => setSurname(e.target.value)}
              />

              <input type="email" className="form-control" placeholder="Email address" required
                  onChange={e => setEmail(e.target.value)}
              />

              <input type="password" className="form-control" placeholder="Password" required
                  onChange={e => setPassword(e.target.value)}
              />
              <button className="w-100 btn btn-lg btn-primary" onClick={register_func}>Register</button>
          </form>
    </main>
  </div>
  );
}