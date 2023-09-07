import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";

const User_Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {authState, setAuthState} = useContext(AuthContext);

    const Check = () => {
      Axios.post("http://localhost:3001/users/login", {

        email: email,
        password: password,
        
      }).then((res) => {

            if(res.data.error) toast.error(res.data.error);
            else {
                // console.log(res.data);
                localStorage.setItem("userToken", res.data.token);

                if(localStorage.getItem("developerToken")) localStorage.removeItem("developerToken");
                if(localStorage.getItem("publisherToken")) localStorage.removeItem("publisherToken");

                toast.success("Login successfull");

                setAuthState({ 
                    user_name: res.data.user_name, 
                    user_id: res.data.user_id , 
                    user_wallet: res.data.user_wallet,
                    user_is_logged: true,
                    

                    developer_name: "",
                    developer_id: null,
                    developer_status: null,
                    developer_is_logged: false,
                    
                    publisher_name: "",
                    publisher_id: null,
                    publisher_status: null,
                    publisher_is_logged: false
                });

                console.log(authState);

                setTimeout(()=> {
                    navigate('/Home');
                    }, 1000);
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
                            <div className="col"><Link className="btn btn-secondary mb-3 container-fluid"  to="/User_Login">Login</Link></div><div className="col"><Link className="btn btn-secondary container-fluid" to="/User_Register">Register</Link></div>
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

                        <div className="row">

                        <div className="col"><button type="submit" className="btn btn-secondary container-fluid"  onClick={Check}>Submit</button></div> 
                        <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/">Back</Link></div>
                    </div>

                    </div><div className="col">
                    </div>

                </div>
                
            </div>
        </div>

    );
};

export default User_Login;