import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Card.css';

const Deals_Add = () => {
    let { id } = useParams();
    
    const [deal, setDeal] = useState({});

    const [gamesList, setGameList] = useState([]);
    const [addGamesList, setAddGameList] = useState([]);



    useEffect(() => {

        // console.log(id);

        Axios.get(`http://localhost:3001/deals/${id}`).then((response) => {
            setDeal(response.data);
        });

        Axios.get(`http://localhost:3001/deals/addedGames/${id}`).then((response) => {
            setGameList(response.data);
        });

        Axios.get(`http://localhost:3001/deals/notAddedGames/${id}`).then((response) => {
            setAddGameList(response.data);
        });

    }, [id]);

    const enlist=(game_id)=>{
        
        Axios.put( `http://localhost:3001/deals/addGame?id=${id}&game_id=${game_id}`).then((response) => {
            if(!response.data.error)
                toast.success("Game added to this deal");
        });
      };

      const delist=(game_id)=>{
        Axios.put(`http://localhost:3001/deals/deleteGame?game_id=${game_id}`).then((response) => {
            if(!response.data.error)
                toast.success("Game removed from this deal");
        });
      };



    return (

        <div className="container">
            
            <br></br>
            <br></br>

            <div>
                <h1 align="center"> <b> {deal.name} </b>   </h1>
                <h2 align="center"> <b>Discount: </b> {deal.cut} %</h2>
                <h2 align="center"> Deal ends {moment(deal.end_date, "YYYYMMDD").fromNow() }</h2>
            </div>

                <br></br>
                <br></br>
                <hr></hr>
                <hr></hr>
                <br></br>
                <br></br>
                <h1 align="center"> <b> Games under deal</b> </h1>
                <br></br>
                <h4 align="center"> ( Remove games from this deal from below ) </h4>
                <br></br>
                <br></br>
                
                <hr></hr>
                <br></br>

                

    
                <div className='wrapper'>
                    {
                        (!gamesList.length) && 
                        <div>
                            <h4 align="center"> No games under this deal ! </h4>
                        
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
                                              <b>Remove From Deal</b> 
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
                <h4 align="center"> ( Add games to this deal from below ) </h4>
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

                                   
                            
                                    <div className='btn'>
                                        <button onClick={()=>{enlist(game.game_id)}}>
                                             <b> Add To Deal </b>  
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

export default Deals_Add;