import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



 


const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const Check = () => {
      Axios.post("http://localhost:3001/users/login", {
      
        email: email,
        password: password,
        
      }).then((res) => {
            if(res.data.error) toast.error(res.data.error);
            else {
                console.log(res.data);
                localStorage.setItem("user", res.data);

                toast.success("Login successfull");

                setTimeout(()=> {
                    navigate('/admin');
                    }, 2000);
            }
      });
    };
  







    return (

        <div className="container">

            <div className="py-4">




                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col border rounded shadow p-3">



                        <div className="row">
                            <div className="col"><Link className="btn btn-secondary mb-3" to="/Login">Login</Link></div><div className="col"><Link className="btn btn-secondary" to="/Register">Register</Link></div>
                        </div>





                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"   onChange={(event) => {
            setEmail(event.target.value);
          }}></input>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"   onChange={(event) => {
            setPassword(event.target.value);
          }}></input>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="submit" className="btn btn-secondary"  onClick={Check}>Submit</button>






                    </div><div className="col">
                    </div>


                </div>






            </div>
        </div>

    );
};

export default Login;