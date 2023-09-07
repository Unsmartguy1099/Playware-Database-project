import React from "react";
import { Link } from "react-router-dom";

const Admin_Options = () => {

    return (

        <div className="container">
        <div className="py-4">
            
            <div className=" p-5 ">
                <div className=" p-5 ">
                </div>
                <div className=" p-5">
                </div>
            </div>
            
            <div className="row">
                <div className="col"></div>
                <div className="col border rounded shadow p-4">
                    <div className="row">
                        <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Admin_Login">Admin Login</Link></div>
                    </div> 
                    <div className="row">
                        <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Publisher_Login">Publisher Login</Link></div>
                    </div> 
                    <div className="row">
                        <div className="col"><Link className="btn btn-secondary mb-3 container-fluid" to="/Developer_Login">Developer Login</Link></div>
                    </div> 
                </div>
                <div className="col"></div> 
            
            </div>

          
        </div>
    </div>


    );
};

export default Admin_Options;