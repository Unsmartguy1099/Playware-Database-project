import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../../helpers/AuthContext";
import './Card.css';


const Publisher= () => {


    const [gamesList, setGameList] = useState([]);
    const [developerList, setDeveloperList] = useState([]);
    const [price, setPrice] = useState();
    
    const {authState} = useContext(AuthContext);

    const publishGame = (game_id, state) => {
        if(state==2)
            state=3;
        if(state==5)
            state=6;

        Axios.put("http://localhost:3001/games/updateStatus", {
                state: state,
                game_id: game_id,
                price: price
            }).then((response) => {
                if(response.data.success)
                    toast.success("Successfully published the game");
            });
    };

    const pullGame= (game_id, state) => {
        if(state==3)
            state=10;
        if(state==4)
            state=11;
        if(state==6)
            state=8;
        if(state==7)
            state=9;

        Axios.put("http://localhost:3001/games/updateStatus", {
                state: state,
                game_id: game_id
            }).then((response) => {
                if(response.data.success)
                    toast.success("Successfully pulled the game from store");
            });
     };

     const deleteGame = (game_id,state)=>{
        if(state==5 && state==2)
            state=1;
        Axios.post('http://localhost:3001/games/operations',{
            id:game_id, 
            state:state
        });
      };

      const acceptDeveloper = (developer_id) => {

            Axios.put('http://localhost:3001/developers/updateStatus',{
                id: developer_id, 
                state: 2
            }).then((response) => {
                if(response.data.success)
                    toast.success("Developer registration accepted");
            });
      };

      const rejectDeveloper = (developer_id) =>{
        Axios.put('http://localhost:3001/developers/updateStatus',{
            id: developer_id, 
            state: 3
        }).then((response) => {
            if(response.data.success)
                toast.success("Developer registration rejected");
        });
      };



      const removeDeveloper=(developer_id,state)=>{
        Axios.put('http://localhost:3001/developers/updateStatus',{
            id: developer_id, 
            state: 1
        }).then((response) => {
            if(response.data.success)
                toast.success("Developer removed");
        });
      };

  
    useEffect(() => {

        if(authState.publisher_id) {
            Axios.get(`http://localhost:3001/games/yourOnes?who=publisher&id=${authState.publisher_id}`).then((response) => {
                 setGameList(response.data);
            });

            Axios.get(`http://localhost:3001/developers?publisher_id=${authState.publisher_id}`).then((response) => {
                setDeveloperList(response.data);
            });
    
        }
      
    }, [authState]);












    return (

        <div className="container">
            <div className="py-4">

            <div className="row mb-4">


            <div className="row mb-4">
                    
                    <hr></hr>

                    <div className="col-lg-5"> 
                    <img src = "https://i.ibb.co/YRB7m33/optimized-large-thumb-stage.jpg" alt="developer" width = "300px" height="300px" />
                    <br></br>
                    <br></br>
                    </div>
                    <div className="col-lg-5">

                        <h3> <b> {authState.publisher_name} </b></h3>
                        <hr></hr>
                        
                        <h4> <b>  </b></h4>
                        <br></br>
                    <br></br>
                        <h4> Status:  {authState.publisher_status}</h4>
                        {/* <h4> Total developers: </h4> */}
                        {/* <hr></hr> */}
                        {/* <h4> Total games: </h4>
                        <h4> Games in store: </h4>
                        <h4> Games requested to publish: </h4>
                        <h4> Games rejected by admin </h4>
                        <br></br> */}

                        

                    </div>
                    <div className="col-lg-2"></div>
                    
                </div>

               <hr></hr>
               <br></br>
               <br></br>
               

            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">

            
            <div className="container">
                    


                    <br></br>
                    <br></br>
                    <hr></hr>
                 

            
                    <h1 align="center">    List of your Games </h1>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <br></br>

                    

        
                    <div className='wrapper'>
                        {   
                            gamesList.map((game, key)=> {
                                
                                return(
                                    <div className = 'card-container' key={key}>
                                        <br></br>
                                        <div className='image-container' >
                                            
                                        <img src={game.img_src} alt={game.name} height="250px" width="290px" border="0" />
                                        </div>
                                
                                        <div className='=card-content'>
                                            <div className='card-title'>
                                                <h3>{game.name}</h3>
                                            </div>
                                
                                            <div className='card-body'>
                                                <p>
                                                    <b> Genre: </b> <i> {game.genre} </i>
                                                    <br></br>
                                                    <b>Total sales : </b> {game.total_sales}
                                                    <br></br>
                                                    { 
                                                        !(game.status === "Requested" ) &&
                                                        <>
                                                            <b>Price : </b>  {game.price}
                                                            <br></br>
                                                        </>
                                                    }
                                                    <b>Status : </b> < i> {game.status} </i> 
                                                </p>
                                                
                                            </div>
                                
                                        </div>

                                        <br></br>

                                       { 
                                        (game.status === "Requested" )  &&
                                        <div> 
                                            <b>Add Price  :  </b>  <input type="double" id="updateInput" onChange={(e)=>{setPrice(e.target.value)}}></input>
                                        </div>
                                       }
                                       

                                        {

                                            
                                                (game.status === "Requested" ) ? 
                                                <>
                                                    <div className='btn' >
                                                    
                                                    <button type="submit" onClick={ () => 
                                                        publishGame(game.game_id, game.state)} >
                                                        <b>
                                                        Publish
                                                        </b>
                                                    </button>
                                                    </div> 
                                                    
                                                    <div className='btn' >

                                                    {
                                                        (game.state == 5) && 
                                                        
                                                        <button type="submit" onClick={ () => 
                                                            publishGame(game.game_id, game.state)} >
                                                        <b>
                                                            Accept pull request
                                                        </b>
                                                    </button>
                                                    }
                                                    
                                                    
                                                    </div> 
                                                </> :
                                               
                                                <div className='btn' >
                                                    <button  type="submit" onClick={ () => 
                                                        pullGame(game.game_id, game.state)} >
                                                        <b>
                                                        Request to Remove
                                                        </b>
                                                    </button>
                                            
                                                 </div>
                                        }


                                        <br></br>
                                        
                                    </div>

                                
                                );
                            })
                        }

                    </div>
                    
                    <br></br>
                    <br></br>
                    <br></br>
            
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
                 

            
                    <h1 align="center">  Your  Developers </h1>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <br></br>

                    

        
                    <div className='wrapper'>
                        {   
                            developerList.map((developer, key)=> {
                                
                                return(
                                    <div className = 'card-container' key={key}>
                                        <br></br>
                                        <div className='image-container' >
                                            
                                            <img src="https://i.ibb.co/Bt6JCNj/708382-people-512x512.png" alt={developer.name} height="200px" width="290px" border="0" />
                                        </div>
                                        <br></br>
                                
                                        <div className='=card-content'>
                                            <div className='card-title'>
                                                <h3>{developer.name}</h3>
                                            </div>
                                
                                            <div className='card-body'>
                                                <p>
                                                    <b> Status: </b> <i> {developer.status} </i>
                                                    <br></br>
                                                    <b>Earning: </b>  {developer.wallet}

                                                </p>
                                                
                                            </div>
                                
                                        </div>

                                        <br></br>

                                        {

                                            
                                                (developer.status === "Registered"  ) ? 
                                                <div className='btn' >
                                                    <button type="submit" onClick={()=> {
                                                        removeDeveloper(developer.developer_id);
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
                                                        acceptDeveloper(developer.developer_id);
                                                    }}>
                                                        <b>
                                                         Accept
                                                        </b>
                                                    </button>
                                                    
                                                    <button  type="submit" onClick={()=> {
                                                        rejectDeveloper(developer.developer_id);
                                                    }}>
                                                        <b>
                                                         Reject
                                                        </b>
                                                    </button>
                                            
                                                 </div>
                                        }
                                        


                                        <br></br>
                                        
                                    </div>

                                
                                );
                            })
                        }

                    </div>
                    
                    <br></br>
                    <br></br>
                    <br></br>
            
            </div>







            </div>
            </div>


            </div>
        </div>

    );
};

export default Publisher;