import Axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Card.css';


const Deals= () => {
    let navigate = useNavigate();
  
   
    const [DealsList, setDealsList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/deals/',{

        }).then((response) => {
            setDealsList(response.data);
        });
    }, []);



    // const EnterDeal=(deal_id)=>{
                  
    //     Axios.post('http://localhost:3001/deals/operation',{
    //         deal_id:deal_id
    //     });
    //   };



    return (
        <div className="container">
            <div className="py-4">
                
            <div className="row mb-4">
                  
            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
            <div className="container">
                <br></br>
                <br></br>
                <h1 align="center"> <b>Ongoing deals and  discounts</b> </h1>
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>

                   <h2 align="center"> Click on the deal to see the games that fall under that deal</h2>
                    
                <br></br>
                <hr></hr>
                <br></br>
                <div className='wrapper'>
                    {   
                        DealsList.map((deal, key)=> {
                            
                            return(
                                <div className = 'card-container' key={key}>
                                    <div onClick={() => { navigate(`/Deal/${deal.deal_id}`);}}>
                                    <div className='=card-content'>
                                        <div className='card-title'>
                                            <h3>{deal.name}</h3>
                                        </div>
                            
                                        <div className='card-body'>
                                            <p>
                                                <br></br>
                                                <b>  Name :  </b> <i>{deal.name}</i>
                                              
                                                <br></br>
                                                <b>Discount : </b> {deal.cut} %
                                                <br></br>
                                                <b>Ends in: </b> {moment(deal.end_date, "YYYYMMDD").fromNow() }
                                                <br></br>
                                                  
                                            </p>
                                            
                                        </div>
                            
                                    </div>

                                    <br></br>
                                    </div>
                                    {/* <div className='btn'>
                                        <button onClick={()=>{EnterDeal(deal.id)}}>
                                               Enter
                                        </button>
                                        
                                    </div> */}
                                    
                                    <br></br>
                                </div>
                               
                            );
                        })
                    }
                </div>

           
        </div>
            </div>
            </div>





            </div>
        </div>

    );
};

export default Deals;