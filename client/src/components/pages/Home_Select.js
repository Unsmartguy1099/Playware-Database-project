import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import './Card.css';

const Home_Select = () => {

    let {id} = useParams();
  

    const [gamesList, setGameList] = useState([]);

    let navigate = useNavigate();
   

    useEffect(() => {
        Axios.get(`http://localhost:3001/games/yourOnes?who=landing&id=0`).then((response) => {
            setGameList(response.data);
        });

    }, []);

    const Select= (game_id) => {
       

        Axios.post("http://localhost:3001/games/Home_Select", {
    
                game_id: game_id,
                pos :id // this id is sent to the backend to let them for which position this game is being selected
        
            }).then((response) => {
                if(response.data.success) {
                    toast.success("Successfully selected the game");

                    setTimeout(()=> {
                        navigate('/Admin');
                        }, 1000);
                }
                    
            });
    };



    return (

        <div className="container">
              
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>

          
                <h1 align="center">Select Games for Position {id}</h1>
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
                                        <button onClick={ () => 
                                                        Select(game.game_id)} >  
                                            <b>
                                            Select
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

export default Home_Select;