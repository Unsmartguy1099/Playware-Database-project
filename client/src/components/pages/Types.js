import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hover.css";

const Types = () => {
    let navigate = useNavigate();
    return (

        <div className="container-fluid">
            <div className="py-4">
                <div className="row">
                <div className="col-lg-1"></div>

                <div className="col-lg-11">
                    <div className="row mb-5">
                    <div className="row">
                    <div className="col-lg-1 p-3 m-3"></div><div className="col-lg-1 p-3"><h2>Games:</h2> </div> </div>
                        <div className="col-lg-1 p-3 m-3"></div>
                        <div className="col-lg-2 hover-container-s bg-white border shadow rounded p-3 m-3" onClick={() => { navigate(`/Game/${1}`);}}><h3>New:</h3><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>
                        <div className="col-lg-2 hover-container-s bg-white border shadow rounded p-3 m-3" onClick={() => { navigate(`/Game/${2}`);}}><h3>Upcoming:</h3><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>
                        <div className="col-lg-2 hover-container-s bg-white border shadow rounded p-3 m-3"  onClick={() => { navigate(`/Game/${3}`);}}><h3>Top Paid:</h3><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>
                        <div className="col-lg-2 hover-container-s bg-white border shadow rounded p-3 m-3"  onClick={() => { navigate(`/Game/${4}`);}}><h3>Top Free:</h3><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>
                    </div>
                   
                    </div>


                </div>
            </div>
        </div>

    );
};

export default Types;