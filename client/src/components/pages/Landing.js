import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {

    let navigate = useNavigate();
    return (

        <div className="container-fluid" style={{ 
            backgroundImage: `url("https://i.ibb.co/6m87bfN/controller-clipart-silhouette-2.png")` 
          }}>
               
               <div className="row my-5">
               </div>
               <div className="row my-5">
               </div>
               <div className="row my-5">
               </div>
               <div className="row my-5">
               </div>
               <div className="row">

               <div className="col-lg-1 p-3 "></div>
               <div className="col-lg-10 p-3 "> 
                    <div className="row container-fluid">

                    <div className="col-lg-3">
                    <div className="col-lg-12 hover-container-s bg-white border shadow rounded p-3 " onClick={() => { navigate(`/Game/${1}`);}}> <h3 >New:</h3><img className="container-fluid" src="https://i.ibb.co/RTysS0q/cod.jpg"  border="0" /></div>
                    </div>
                    <div className="col-lg-3">
                    <div className="col-lg-12 hover-container-s bg-white border shadow rounded p-3 " onClick={() => { navigate(`/Game/${2}`);}}> <h3 >Upcoming:</h3><img className="container-fluid" src="https://i.ibb.co/fQr3Sg8/halo.png"  border="0" /></div>
                    </div>
                    <div className="col-lg-3">
                    <div className="col-lg-12 hover-container-s bg-white border shadow rounded p-3 " onClick={() => { navigate(`/Game/${3}`);}}> <h3>Top Paid:</h3><img className="container-fluid" src="https://i.ibb.co/fkdRG6y/rdr.png"  border="0" /></div>
                    </div>
                    <div className="col-lg-3">
                    <div className="col-lg-12 hover-container-s bg-white border shadow rounded p-3 " onClick={() => { navigate(`/Game/${4}`);}}> <h3>Top Free:</h3><img className="container-fluid" src="https://i.ibb.co/mCRy4Cp/shad.jpg"  border="0" /></div>
                    </div>
                    </div>
                     
                </div>  
                <div className="col-lg-1 p-3 "></div>

                <div className="row mb-5"> </div>

                <div className="row mb-5"> </div>
                <div className="row mb-5"> </div>
               </div>
           
        </div>

    );
};

export default Landing;