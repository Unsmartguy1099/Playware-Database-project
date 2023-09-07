import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Card.css';

const Sub_Add = () => {

    let { id } = useParams();
    
    const [subscription, setSubscription] = useState({});

    const [gamesList, setGameList] = useState([]);
    const [addGamesList, setAddGameList] = useState([]);

    // const [ArrivalDate, setArrivalDate] = useState();
    const [DelistDate, setDelistDate] = useState();
   

    useEffect(() => {

        // console.log(id);

        Axios.get(`http://localhost:3001/subscriptions/${id}`).then((response) => {
            setSubscription(response.data);
        });

        Axios.get(`http://localhost:3001/subscriptions/subscribed/${id}`).then((response) => {
            setGameList(response.data);
        });

        Axios.get(`http://localhost:3001/subscriptions/notSubscribed/${id}`).then((response) => {
            setAddGameList(response.data);
        });

    }, [id]);

    const enlist=(game_id)=>{
        
        Axios.post('http://localhost:3001/subscriptions/addGame',{
            game_id:game_id, 
            // ArrivalDate: Date.now,
            sub_id: id,
            delist_date: DelistDate
        }).then((response) => {
            if(!response.data.error)
                toast.success("Game enlisted");
        });
      };

      const delist=(game_id)=>{
        Axios.delete(`http://localhost:3001/subscriptions/deleteGame?game_id=${game_id}&sub_id= ${id} `).then((response) => {
            if(!response.data.error)
                toast.success("Game delisted");
        });
      };



    return (

        <div className="container">
            
            <br></br>
            <br></br>

            <div>
                <h1 align="center"> <b> {subscription.name} </b>   </h1>
                <h2 align="center"> <b>Monthly payment: </b> {subscription.monthly_payment} $</h2>
            </div>

                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <h1 align="center"> <b> Games under subscription</b> </h1>
                <br></br>
                <h4 align="center"> ( Remove games from this subscription from below ) </h4>
                <br></br>
                <br></br>
                
                <hr></hr>
                <br></br>

                

    
                <div className='wrapper'>
                    {
                        (!gamesList.length) && 
                        <div>
                            <h4 align="center"> No games under this subscription ! </h4>
                        
                        </div>
                    }

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
                                            </p>
                                            
                                        </div>
                            
                                    </div>

                                    <br></br>

                                    <div className='btn'>
                                        <button onClick={()=>{delist(game.game_id)}}>
                                              <b>Remove From Subscription</b> 
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


                <br></br>
                <br></br>
                <hr></hr>
                <hr></hr>
                <br></br>
                <br></br>
                <h1 align="center"> <b> Stored Games To Add</b> </h1>
                <br></br>
                <h4 align="center"> ( Add games to this subscription from below ) </h4>
                <br></br>
                <br></br>
                
                <hr></hr>
                <br></br>

                

    
                <div className='wrapper'>
                    {   
                        addGamesList.map((game, key)=> {
                            
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
                                            </p>
                                            
                                        </div>
                            
                                    </div>

                                    <br></br>

                                    {/* <input type="integer" id="updateInput" onChange={(e)=>{setArrivalDate(e.target.value)}}></input> */}
                                   <b> Delist Date   : </b> <input type="date" id="updateInput"  onChange={(e)=>{setDelistDate(e.target.value)}}></input>
                                    
                                    <div className='btn'>
                                        <button onClick={()=>{enlist(game.game_id)}}>
                                             <b> Add To Subscription </b>  
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
        

    );
};

export default Sub_Add;