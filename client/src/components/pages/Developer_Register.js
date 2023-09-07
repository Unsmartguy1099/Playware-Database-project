import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Developer_Register = () => {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [publisher_name, setPublisher_name] = useState("");

    let navigate = useNavigate();
   
    
    
    const addDeveloper = () => {

      if(password !== password2) toast.error("Passwords don't match!");
      else {
          Axios.post("http://localhost:3001/developers", {
              name:name,
              password: password,
              publisher_name : publisher_name
              
            }).then((res) => {

              if(res.data.error)  {
                toast.error(res.data.error);
              }
                
              else {
                toast.success("Developer registration successfull");

                setTimeout(()=> {
                  navigate('/Developer_Login');
                }, 2000);
              }
                
            
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
                  <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Developer_Login">Login</Link></div><div className="col"><Link className="btn btn-secondary container-fluid" to="/Developer_Register">Register</Link></div>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                    setName(event.target.value);
                  }}></input>
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                    setPublisher_name(event.target.value);
                  }}></input>
                  <label htmlFor="floatingInput">Publisher</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => {
                    setPassword(event.target.value);
                  }}></input>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => {
                    setPassword2(event.target.value)
                  }}></input>
                  <label htmlFor="floatingPassword">Confirm password</label>
                </div>
    
                <div className="row">
                    <div className="col"><button type="submit" className="btn btn-secondary container-fluid"  onClick={addDeveloper}>Submit</button></div> <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Admin_Options">Back</Link></div>
                    </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
    
      );
};

export default Developer_Register;