import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import './Card.css';


const Subscription = () => {

    let {id} = useParams();
    let navigate = useNavigate();


    const [subscription, setSubscription] = useState({});
    const [gamesList, setGameList] = useState([]);


    useEffect(() => {

        Axios.get(`http://localhost:3001/subscriptions/${id}`).then((response) => {
            setSubscription(response.data);
        });

        Axios.get(`http://localhost:3001/subscriptions/subscribed/${id}`).then((response) => {
            setGameList(response.data);
        });

    }, []);

    const Wishlist = (game_id) => {


        Axios.put("http://localhost:3001/games/wishlist", {

                game_id: game_id,

            }).then((response) => {
                if(response.data.success)
                    toast.success("Successfully published the game");
            });
    };



    return (

        <div className="container">
            <br></br>
            <br></br>

            <div>
                <h1 align="center"> <b> {subscription.name} </b>   </h1>
                <h2 align="center"> <b>Monthly payment: </b> {subscription.monthly_payment} $</h2>
                <h2 align="center"> <b>Total Games: </b> {subscription.total_games} </h2>
            </div>


                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                


                <h1 align="center">   Games under this subscription </h1>
                <br></br>
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
                                                <b>Total sales : </b> {game.total_sales}
                                            </p>

                                        </div>

                                    </div>

                                    <br></br>

                                </div>


                            );
                        })
                    }
                </div>
                <br></br>
                <br></br>
                <hr></hr>


        </div>


    );
};

export default Subscription;