import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from '../../helpers/AuthContext';
import './Card.css';

const Wishlist = () => {
    let navigate = useNavigate();

    const [gamesList, setGameList] = useState([]);
    const {authState} = useContext(AuthContext);
   

    useEffect(() => {

        Axios.get(`http://localhost:3001/games/wishlist/${authState.user_id}`).then((response) => {
            setGameList(response.data);
        });

    }, []);

    const removeFromWishlist = (game_id) => {
       

        Axios.post("http://localhost:3001/games/removeWishlist", {
    
                game_id: game_id,
                user_id: authState.user_id,
        
            }).then((response) => {
                if(!response.data.error)
                    toast.success(response.data);
                else 
                    toast.error("Already added to wishlist")
            });
    };



    return (

        <div className="container">
              
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>

          
                <h1 align="center">    Your wishlist </h1>
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
                                        <button onClick={() => { navigate(`/Buy/${game.game_id}`);}}>
                                            <b>
                                                Buy
                                            </b>
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

export default Wishlist;