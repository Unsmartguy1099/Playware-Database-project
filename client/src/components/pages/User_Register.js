import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const User_Register = () => {

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gamertag, setGamertag] = useState("");


  const addUser = () => {
    Axios.post("http://localhost:3001/users", {
      name:name,
      email: email,
      password: password,
      gamer_tag:gamertag,
      
    }).then(() => {

        toast.success("Registration Successfull");

        setTimeout(()=> {
          navigate('/User_Login');
        }, 2000);
    
    });
  };
    return (

      <div className="container">

        <div className="py-4">
          <div className="row ">
            <div className="col"></div>
            <div className="col border shadow rounded p-3">
              <div className="row">
                <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/User_Login">Login</Link></div><div className="col"><Link className="btn btn-secondary container-fluid" to="/User_Register">Register</Link></div>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                  setName(event.target.value);
                }}></input>
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                  setGamertag(event.target.value);
                }}></input>
                <label htmlFor="floatingInput">Gamertag</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                  setEmail(event.target.value);
                }}></input>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => {
                  setPassword(event.target.value);
                }}></input>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="row">
                      <div className="col"><button type="submit" className="btn btn-secondary container-fluid"  onClick={addUser}>Submit</button></div> <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/">Back</Link></div>
                      </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>

    );
};

export default User_Register;