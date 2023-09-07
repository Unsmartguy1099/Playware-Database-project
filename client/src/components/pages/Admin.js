import Axios from "axios";
import React, { useEffect, useState } from "react";

import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Card.css';


const Admin= () => {



    const [gamesList, setGameList] = useState([]);
    const [publisherList, setPublisher] = useState([]);
    const [userList, setUser] = useState([]);
    const [subList, setSub] = useState([]);
    const [dealsList, setDeals] = useState([]);
    const [devCut, setDevCut] = useState();
    const [pubCut, setPubCut] = useState();

    const [SubName, setSubName] = useState();
    const [Price, setPrice] = useState();
    const [dealsName, setDealsName] = useState();
    const [cut, setCut] = useState();
    const [endDate, setEndDate] = useState();

    let navigate = useNavigate();

     // Redeem Code Generator-----
     const sho="Empty";
     const length1=10;
     const [vari, setVari] = useState(sho);
     const [value, setValue] = useState();
      const Generate=(length)=>{
          var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     setVari(result); 
        };
  
        const Redeem=()=>{
                    
          Axios.post('http://localhost:3001/redeems',{
              wallet_value:value,
              redeem :vari
          }).then((response) => {
              if(!response.data.error)
                  toast.success("Redeem Code Added");
          });
  
          setVari(sho);
      
        };
// -------------  
    

    
  
    useEffect(() => {
        Axios.get(`http://localhost:3001/games/yourOnes?who=admin&id=0`).then((response) => {
                 setGameList(response.data);
            });
  
        Axios.get('http://localhost:3001/publishers/').then((response) => {
            setPublisher(response.data);
        });
    
        Axios.get('http://localhost:3001/users/').then((response) => {
            setUser(response.data);
        });
    
        Axios.get('http://localhost:3001/subscriptions/').then((response) => {
            setSub(response.data);
        });
    
        Axios.get('http://localhost:3001/deals/').then((response) => {
            setDeals(response.data);
        });
        
    }, []);


    const SubAdd=(game_id,state)=>{
                  
        Axios.post('http://localhost:3001/subscriptions',{
            name:SubName,
            price:Price
        }).then((response) => {
            if(!response.data.error)
                toast.success("Subscription Added");
        });
      };


      const DealsAdd=(game_id,state)=>{
                  
        Axios.post('http://localhost:3001/deals',{
            name:dealsName, 
            cut:cut,
            endDate: endDate
        }).then((response) => {
            if(!response.data.error)
                toast.success("Deal Added");
        });
      };




    const acceptRemoveRequest=(game_id,state)=>{
        if(state==10)
            state=2
        if(state==8)
            state=5
        if(state==6)
            state=5
        if(state==3) 
            state=2           
        Axios.put('http://localhost:3001/games/updateStatus',{
            game_id:game_id, 
            state:state 
        }).then((response) => {
            if(!response.data.error)
                toast.success("Remove request from publisher accepted");
        });
    };

    const storeGame=(game_id,state)=>{
        if(state==10)
            state=11
        if(state==8)
            state=9
        if(state==6)
            state=7
        if(state==3)
            state=4
        Axios.put('http://localhost:3001/games/updateStatus',{
            game_id:game_id, 
            state:state ,
            developer_cut:devCut,
            publisher_cut:pubCut
        }).then((response) => {
            if(!response.data.error)
                toast.success("Successfully stored The Game");
        });
    };

    const removeFromStore=(game_id,state)=>{
        if(state==11)
            state=10
        if(state==9)
            state=8
        if(state==7)
            state=6
        if(state==4)
            state=3
        Axios.put('http://localhost:3001/games/updateStatus',{
            game_id:game_id, 
            state:state 
        }).then((response) => {
            if(!response.data.error)
                toast.success("Successfully removed the Game from store");
        });
    };

    const acceptPublisher = (publisher_id) => {

        Axios.put('http://localhost:3001/publishers/updateStatus',{
            id: publisher_id, 
            state: 2
        }).then((response) => {
            if(response.data.success)
                toast.success("Publisher registration accepted");
        });
    };

    const rejectPublisher = (publisher_id) =>{
        Axios.put('http://localhost:3001/publishers/updateStatus',{
            id: publisher_id, 
            state: 3
        }).then((response) => {
            if(response.data.success)
                toast.success("Publisher registration rejected");
        });
    };



   const removePublisher=(publisher_id,state)=>{
        Axios.put('http://localhost:3001/publishers/updateStatus',{
            id: publisher_id, 
            state: 1
        }).then((response) => {
            if(response.data.success)
                toast.success("Publisher removed");
        });
   };


    const banUser=(user_id)=>{
        Axios.put(`http://localhost:3001/users/updateStatus?id=${user_id}&state=2`).then((response) => {
            if(!response.data.error)
                toast.success("User banned");
        });
    };

    const removeBan=(user_id)=>{
        Axios.put(`http://localhost:3001/users/updateStatus?id=${user_id}&state=1`).then((response) => {
            if(!response.data.error)
                toast.success("User ban removed");
        });
    };


    const removeSubscription=(subscription_id)=>{
        Axios.delete(`http://localhost:3001/subscriptions?id=${subscription_id}`).then((response) => {
            if(!response.data.error)
                toast.success("Subscription Deleted");
        });;
    };

    const removeDeals=(deal_id)=>{
        Axios.delete(`http://localhost:3001/deals?id=${deal_id}`).then((response) => {
            if(!response.data.error)
                toast.success("Deal deleted");
        });;
    };

    return (
        <div className="container">
        <div className="py-4">




        <div className="col-lg-6 container-fluid bg-white border shadow rounded p-3">
                <div className="row border shadow rounded p-3">
                    <div className="col-lg-8"><h4 >Rideem Code:<b> {vari}</b></h4></div>
                    <div className="col-lg-4"><input className="border-5  rounded" type="integer" id="updateInput" placeholder="0" onChange={(e)=>{setValue(e.target.value)}}></input></div>
                </div>
                <div className='btn'> <button type="submit" onClick={()=> {Generate(length1);}}>Generate</button></div>
                <div className='btn'> <button  type="submit" onClick={()=> {Redeem();}}>Active This Redeem</button></div>
        </div>




            <div className=" row">

                <div className="col-lg-1"></div>

                <div className="col-lg-11 rounded p-3 p-3">


                    

                    <div className="row mb-3">
                            <div className="col-lg-6 hover-container-b bg-white border shadow rounded p-3 mx-4 " onClick={() => { navigate(`/Home_Select/${1}`);}}> <img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" />
                            
                            </div> 
                            <div className="col-lg-3"> 
                                <div className="row border hover-container bg-white shadow rounded p-3 mb-3"  onClick={() => { navigate(`/Home_Select/${2}`);}}><img className="container-fluid"  src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>
                                <div className="row border hover-container bg-white shadow rounded p-3 " onClick={() => { navigate(`/Home_Select/${3}`);}}><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>   
                            </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 mx-3">
                            <div className="row">
                                <div className="col border hover-container bg-white shadow rounded p-3 mx-2">   
                                <img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" />   
                                </div>
                                <div className="col "> 
                                    <div className="row mb-2 border hover-container bg-white shadow rounded p-3 mb-3"><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /> </div> 
                                    <div className="row border hover-container bg-white shadow rounded p-3"><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /> </div> 
                                </div>  
                            </div>
                        </div>
                    <div className="col-lg-3 border hover-container bg-white shadow rounded p-3 mx-1" onClick={() => { navigate(`/Home_Select/${4}`);}}><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div> 
                        <div className="col-lg-3  border hover-container bg-white shadow rounded p-3 mx-1" onClick={() => { navigate(`/Home_Select/${5}`);}}><img className="container-fluid" src="https://i.ibb.co/88Vw6Ct/valorant.jpg"  border="0" /></div>  
                    </div>
                </div>
             
            </div>





            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>

                 <div className="row mb-4">

                     

                        <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
                            
                        

                        <div className="container">
                            
                            <br></br>
                            <br></br>
                            <hr></hr>
                        

                    
                            <h1 align="center">    List of Games </h1>
                            
                            <hr></hr>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className='wrapper'>
                                {   
                                    gamesList.map((game, key)=> {
                                        
                                        return(
                                            <div className = 'card-container' key={key}>
                                                <div className='image-container' >
                                                    
                                                <img src={game.img_src} alt={game.name} height="250px" width="290px" border="0" />
                                                </div>
                                        
                                                <div className='=card-content'>
                                                    <div className='card-title'>
                                                        <h3>{game.name}</h3>
                                                    </div>
                                        
                                                    <div className='card-body'>
                                                        <p>
                                                            <b> <i> Genre: {game.genre} </i></b>
                                                            <br></br>
                                                            <b>Release date: </b> {moment(game.release_date).format("L")}
                                                            <br></br>
                                                            <b>Price : </b> {game.price} $
                                                            <br></br>
                                                            <b>Total sales : </b> {game.total_sales}
                                                            <br></br>
                                                            <b>Status : </b> {game.status}
                                                        </p>
                                                        
                                                    </div>
                                        
                                                </div>

                                                <br></br>

                                                {
                                                    (game.status != "Stored") ?
                                                    <>

                                                        <b>Dev's cut :- </b>  
                                                        <input type="integer" id="updateInput" placeholder="50%" onChange={(e)=>{setDevCut(e.target.value)}}></input>

                                                        <br></br>
                                                        <br></br>

                                                        <b>Pub's cut :- </b>
                                                        <input type="integer"  id="updateInput" placeholder="30%" onChange={(e)=>{setPubCut(e.target.value)}}></input>
                                                        
                                                        <br></br>
                                                        <br></br>
                                                        
                                                        <div className='btn'>
                                                            <button onClick={()=>{storeGame(game.game_id, game.state)}}>
                                                            <b>Add to Store</b> 
                                                            </button>
                                                            
                                                        </div>
                                                        {
                                                            (game.state == 10 || game.state == 8 || game.state == 6) &&
                                                            <div className='btn'>
                                                                <button onClick={()=>{acceptRemoveRequest(game.game_id,game.state)}}>
                                                                <b>Accept Remove Request</b>
                                                                </button>
                                                                
                                                            </div>
                                                        }
                                                        
                                                    </> :
                                                    <>

                                                        
                                                        <div className='btn'>
                                                            <button onClick={()=>{removeFromStore(game.game_id, game.state)}}>
                                                               <b> Remove from store </b> 
                                                            </button>
                                                            
                                                        </div>
                                                    </>
                                                }
                                                
                                                
                                        
                                               
                                                <br></br>
                                                <br></br>
                                                <br></br>
                                            </div>

                                        
                                        );
                                    })
                                }
                            </div>

                    
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>

                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>



                 <div className="row mb-4">
                     
                        <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
                            <div className="container">
                            
                                <br></br>
                                <br></br>
                                <hr></hr>
                            

                        
                                <h1 align="center">    List of Publishers </h1>
                                
                                <hr></hr>
                                <br></br>
                                <br></br>
                                <br></br>

                                <div className='wrapper'>
                                    {   
                                        publisherList.map((publisher, key)=> {
                                            
                                            return(
                                                <div className = 'card-container' key={key}>
                                                    <div className='image-container' >

                                                    <img src="https://i.ibb.co/YRB7m33/optimized-large-thumb-stage.jpg"alt={publisher.name} height="250px" width="290px" border="0" />
                                                    </div>
                                            
                                                    <div className='=card-content'>
                                                        <div className='card-title'>
                                                            <h3>{publisher.name}</h3>
                                                        </div>
                                            
                                                        <div className='card-body'>
                                                            <p>
                                                                <br></br>
                                                                <b>Status: </b> {publisher.status}
                                                                <br></br>
                                                                <b>Number of Games: </b> {publisher.number}
                                                                <br></br>
                                                                <b>Earnings: </b> {publisher.wallet} $
                                                                <br></br>
                                                                
                                                            </p>
                                                            
                                                        </div>
                                            
                                                    </div>

                                                    <br></br>
                                            
                                                    {                                       
                                                        (publisher.status === "Registered"  ) ? 
                                                        <div className='btn' >
                                                            <button type="submit" onClick={()=> {
                                                                removePublisher(publisher.publisher_id);
                                                            }} >
                                                                <b>
                                                                Remove
                                                                </b>
                                                            </button>
                                                        </div> 

                                                        : 

                                                        <div className='btn' >
                                                            <b>Registration request ?  </b>
                                                            <button  type="submit" onClick={()=> {
                                                                acceptPublisher(publisher.publisher_id);
                                                            }}>
                                                                <b>
                                                                Accept
                                                                </b>
                                                            </button>
                                                            
                                                            <button  type="submit" onClick={()=> {
                                                                rejectPublisher(publisher.publisher_id);
                                                            }}>
                                                                <b>
                                                                Reject
                                                                </b>
                                                            </button>

                                                        </div>
                                                    }
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                </div>

                                            
                                            );
                                        })
                                    }
                                </div>

                        
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                     </div>




                <br></br>
                <br></br>
                
                <br></br>
                <br></br>




                 <div className="row mb-4">
                      
                            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
                                <div className="container">
                            
                                <br></br>
                                <br></br>
                                <hr></hr>
                            

                        
                                <h1 align="center">    List of Users </h1>
                                
                                <hr></hr>
                                <br></br>
                                <br></br>
                                <br></br>


                                    <div className='wrapper'>
                                        {   
                                            userList.map((user, key)=> {
                                                
                                                return(
                                                    <div className = 'card-container' key={key}>
                                                    
                                                        <div className='=card-content'>
                                                            <div className='card-title'>
                                                                <h3>{user.name}</h3>
                                                            </div>
                                                
                                                            <div className='card-body'>
                                                                <p>
                                                                    <br></br>
                                                                    <b>Gamer Tag : </b> {user.gamer_tag}
                                                                    <br></br>
                                                                    <b>Status : </b> {user.status}
                                                                    <br></br>
                                                                    <b>Credit: </b> {user.wallet} $
                                                                    <br></br>
                                                                    
                                                                </p>
                                                                
                                                            </div>
                                                
                                                        </div>

                                                        <br></br>
                                                        {
                                                            user.status == "Registered" ?
                                                            <div className='btn'>
                                                                <button onClick={()=>{banUser(user.user_id)}}>
                                                                    <b> Ban this user </b>
                                                                </button>
                                                                
                                                            </div> :
                                                            <div className='btn'>
                                                                <button onClick={()=>{removeBan(user.user_id)}}>
                                                                    <b> Remove ban </b>
                                                                </button>
                                                                
                                                            </div>
                                                        }
                                                
                                                        
                                                        <br></br>
                                                    </div>

                                                
                                                );
                                            })
                                        }
                                    </div>
                            
                                </div>
                        </div>
                </div>




                    {//Subscription Section--------------------------------------------------------------------------------------------------
                    }





                <div className="row mb-4">

                    <div className="col-lg-3"></div>

                    <div className="col-lg-6 border shadow rounded p-3">
                        <h2>Subscription Uploading Section:</h2>


                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                        setSubName(event.target.value);
                        }}></input>
                        <label for="floatingInput">Name</label>
                    </div>



                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                        setPrice(event.target.value);
                        }}></input>
                        <label for="floatingInput">Price</label> 
                    </div>


                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4"><button type="submit" className="btn btn-secondary container-fluid"  onClick={SubAdd}>Add</button></div> 
                        <div className="col-lg-4"></div>  
                    </div> 

                    </div>

                    <div className="col-lg-3">

                    </div>


                </div>






                <div className="row mb-4">
                    <h2>Subscription List:</h2>
                        <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
                            <div className="container">
                            
                                <br></br>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <div className='wrapper'>
                                    {   
                                        subList.map((subscription, key)=> {
                                            
                                            return(
                                                <div className = 'card-container' key={key}>
                                                    
                                                    <div className='=card-content' onClick= {()=>  { 
                                                        navigate(`/Sub_Add/${subscription.subscription_id}`)
                                                    }}>
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
                                                                <b>Monthly Payment: </b> {subscription.monthly_payment} $
                                                                <br></br>
                                                                
                                                            </p>
                                                            
                                                        </div>
                                            
                                                    </div>

                                                    <br></br>
                                            
                                                    <div className='btn'>
                                                        <button onClick={()=>{removeSubscription(subscription.subscription_id)}}>
                                                            Remove
                                                        </button>
                                                        
                                                    </div>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                </div>

                                            
                                            );
                                        })
                                    }
                                    
                                </div>

                            
                            </div>
                        </div>
                    </div>


                    {//Deals Section--------------------------------------------------------------------------------------------------
                    }


                <div className="row mb-4">

                    <div className="col-lg-3"></div>

                    <div className="col-lg-6 border shadow rounded p-3">
                            <h2>Deals Upload Section:</h2>


                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setDealsName(event.target.value);
                            }}></input>
                            <label for="floatingInput">Name</label>
                        </div>



                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setCut(event.target.value);
                            }}></input>
                            <label for="floatingInput">Cut</label> 
                        </div>

                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setEndDate(event.target.value);
                            }}></input>
                            <label for="floatingInput">End Date</label> 
                        </div>


                        <div className="row">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4"><button type="submit" className="btn btn-secondary container-fluid"  onClick={DealsAdd}>Add</button></div> 
                            <div className="col-lg-4"></div>  
                         </div> 

                    </div>


                    <div className="col-lg-3"></div>


                </div>



                <div className="row mb-4">
                    <h2>Deals List:</h2>

                    <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
                        <div className="container">
                    
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>

                            <div className='wrapper'>
                                {   
                                    dealsList.map((deals, key)=> {
                                        
                                        return(
                                            <div className = 'card-container' key={key}>
                                                
                                                <div className='=card-content' onClick= {()=>  { 
                                                        navigate(`/Deals_Add/${deals.deal_id}`)
                                                    }}>
                                                    <div className='card-title'>
                                                        <h3>{deals.name}</h3>
                                                    </div>
                                        
                                                    <div className='card-body'>
                                                        <p>
                                                            <br></br>
                                                            <b> <i> Name: {deals.name} </i></b>
                                                            <br></br>
                                                            <b>Number of Games: </b> {deals.number}
                                                            <br></br>
                                                            <b>Cut: </b> {deals.cut}%
                                                            <br></br>
                                                            
                                                        </p>
                                                        
                                                    </div>
                                        
                                                </div>

                                                <br></br>
                                        
                                                <div className='btn'>
                                                    <button onClick={()=>{removeDeals(deals.deal_id)}}>
                                                        Remove
                                                    </button>
                                                    
                                                </div>
                                                <br></br>
                                                <br></br>
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

export default Admin;