import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Publisher_Register = () => {

 let navigate = useNavigate();

const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [password2, setPassword2] = useState("");
const [legalTerms, setLegalTerms] = useState("");

const addPublisher = () => {
  if(password !== password2) {
    toast.error("Passwords don't mmatch");
  } else {
      Axios.post("http://localhost:3001/publishers", {
          name:name,
          password: password,
          wallet: 0,   
          legal_terms: legalTerms
        }).then(() => {

          toast.success("Registration Successfull");

          setTimeout(()=> {
            navigate('/Publisher');
          }, 2000);
        
        });    
  }
  
};
  return (

    <div className="container">

      <div className="py-4">
        <div className="row ">
          <div className="col"></div>
          <div className="col border shadow rounded p-3">
            <div className="row">
              <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Publisher_Login">Login</Link></div><div className="col"><Link className="btn btn-secondary container-fluid" to="/Publisher_Register">Register</Link></div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                setName(event.target.value);
              }}></input>
              <label htmlFor="floatingInput">Name</label>
            </div>

            <div className="form-floating mb-3" >
              <input type="textarea" className="form-control" id="floatingInput" placeholder="Legal lerms: 1)...." onChange={(event) => {
                setLegalTerms(event.target.value);
              }}></input>
              <label htmlFor="floatingInput">Legal Terms</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => {
                setPassword(event.target.value);
              }}></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => {
                setPassword2(event.target.value);
              }}></input>
              <label htmlFor="floatingPassword">Confirm Password</label>
            </div>

            <div className="row">
                    <div className="col"><button type="submit" className="btn btn-secondary container-fluid"  onClick={addPublisher}>Submit</button></div> <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Admin_Options">Back</Link></div>
                    </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>

  );
};

export default Publisher_Register;