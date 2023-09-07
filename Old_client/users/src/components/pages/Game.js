import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import './Card.css';

const Game = () => {


    const [gamesList, setGameList] = useState([]);
    const [topFreeGames, setTopFreeGames] = useState([]);
    const [topPaidGames, setTopPaidGames] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/games/`).then((response) => {
            setGameList(response.data);
        });

        Axios.get(`http://localhost:3001/games/top_free`).then((response) => {
            setTopFreeGames(response.data);
        });

        Axios.get(`http://localhost:3001/games/top_paid`).then((response) => {
            setTopPaidGames(response.data);
        });

    }, []);




    return (

        <div className="container">
                <br></br>
                <br></br>
                <hr></hr>

                <h1 align="center">   Top 3 Paid Downloaded Games </h1>
                <br></br>
                <br></br>
                <hr></hr>

                <div className='wrapper'>
                    {   
                        
                        topPaidGames.map((game, key)=> {
                            
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
                                        <button>
                                            <a href='/Game'>
                                                Buy
                                            </a>
                                        </button>
                                        
                                    </div>
                                    <div className='btn'>
                                        <button>
                                            <a href='/Game'>
                                            (+) Add to wishlist
                                            </a>
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
                <br></br>
                <br></br>

                <h1 align="center">   Top 3 Free Downloaded Games </h1>
                <br></br>
                <br></br>
                <hr></hr>

                <div className='wrapper'>
                    {
                        topFreeGames.map((game, key)=> {
                            
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
                                        <button>
                                            <a href='/Game'>
                                                Buy
                                            </a>
                                        </button>
                                        
                                    </div>
                                    <div className='btn'>
                                        <button>
                                            <a href='/Game'>
                                               (+) Add to wishlist
                                            </a>
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
                <br></br>
                <br></br>

          
                <h1 align="center">    List of All Games </h1>
                <hr></hr>
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
                                            </p>
                                            
                                        </div>
                            
                                    </div>

                                    <br></br>
                            
                                    <div className='btn'>
                                        <button>
                                            <a href='/Game'>
                                                Buy
                                            </a>
                                        </button>
                                        
                                    </div>
                                    <div className='btn'>
                                        <button>
                                            <a href='/Game'>
                                            (+) Add to wishlist
                                            </a>
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

export default Game;