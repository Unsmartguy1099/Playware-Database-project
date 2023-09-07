import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";

import './Card.css';



const Subscriptions = () => {
    let navigate = useNavigate();

    const [subList, setSub] = useState([]);

    const {authState} = useContext(AuthContext);

    useEffect(() => {
        Axios.get('http://localhost:3001/subscriptions/',{
        }).then((response) => {
            setSub(response.data);
        });
    }, []);



      const subscribe =(Sub_id)=>{
                  
        Axios.post(`http://localhost:3001/subscriptions/userSubscribe?u_id=${authState.user_id}&s_id=${Sub_id}`).then((response) => {
            if(response.data.error) {
                toast.error("Already Subscribed")
            } else {
                toast.success("You subscribed!")
            }
        });
      };



    return (
        <div className="container">
            <div className="py-4">

{//Subscription Section--------------------------------------------------------------------------------------------------
}

           





            <div className="row mb-4">
            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
            <div className="container">
        
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <h1 align="center" > Subscriptions List</h1>
                <br></br>
                <hr></hr>
                <br></br>

                <div className='wrapper'>
                    {   
                        subList.map((subscription, key)=> {
                            
                            return(
                                <div className = 'card-container' key={key}>
                                    <div onClick={() => { navigate(`/Subscription/${subscription.subscription_id}`);}}>
                                    
                                    <div className='=card-content'>
                                        <div className='card-title'>
                                            <h3>{subscription.name}</h3>
                                        </div>
                            
                                        <div className='card-body'>
                                            <p>
                                                <br></br>
                                                <b> <i> Name: {subscription.name} </i></b>
                                                <br></br>
                                                <b>Number of Games: </b> {subscription.total_games}
                                                <br></br>
                                                <b>Monthly Payment: </b> {subscription.monthly_payment}
                                             
                                            </p>
                                            
                                        </div>
                                        </div>
                            
                                    </div>

                                    <br></br>
                            
                                
                                    <div className='btn'>
                                        <button onClick={()=>{subscribe(subscription.subscription_id)}}>
                                             <b> Subscribe </b> 
                                        </button>
                                        
                                    </div>
                                    <br></br>
                                    
                                </div>

                               
                            );
                        })
                        
                    }
                               
                </div>

                <br></br>
               <br></br>
        </div>
            </div>
            </div>





            </div>
        </div>

    );
};

export default Subscriptions;