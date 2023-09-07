import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";

const Developer_Login = () => {

    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const {authState, setAuthState} = useContext(AuthContext);
    
    const Check = () => {
      Axios.post("http://localhost:3001/developers/login", {
      
        name: name,
        password: password,
        
      }).then((res) => {
            if(res.data.error) toast.error(res.data.error);
            else {

                console.log(res.data);
                localStorage.setItem("developerToken", res.data.token);

                if(localStorage.getItem("userToken")) localStorage.removeItem("userToken");
                if(localStorage.getItem("publisherToken")) localStorage.removeItem("publisherToken");

                toast.success("Login successfull");

                setAuthState({
                    developer_name: res.data.developer_name,
                    developer_id: res.data.developer_id,
                    developer_status: res.data.developer_status,
                    developer_is_logged: true,
                    
                    user_name: "",
                    user_id: null,
                    user_is_logged: false,
                    
                    publisher_name: "",
                    publisher_id: null,
                    publisher_status: null,
                    publisher_is_logged: false
                    
                  });

                setTimeout(()=> {
                    navigate('/Developer');
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
                        <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Developer_Login">Login</Link></div><div className="col"><Link className="btn btn-secondary container-fluid" to="/Developer_Register">Register</Link></div>
                    </div>





                    <div className="form-floating mb-3">
                        <input type="name" className="form-control" id="floatingInput" placeholder="name@example.com"   onChange={(event) => {
        setName(event.target.value);
      }}></input>
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"   onChange={(event) => {
        setPassword(event.target.value);
      }}></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="row">
                    <div className="col"><button type="submit" className="btn btn-secondary container-fluid"  onClick={Check}>Submit</button></div> <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Admin_Options">Back</Link></div>
                    </div>






                </div><div className="col">
                </div>


            </div>






        </div>
    </div>


    );
};

export default Developer_Login;