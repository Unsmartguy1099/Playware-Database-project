import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import './Card.css';

const User = () => {
    let navigate = useNavigate();

    const {authState} = useContext(AuthContext);

    const [user, setUser] = useState({});
    const [gamesList, setGameList] = useState([]);
    const [subList, setSubList] = useState([]);
    const [redeem, setRedeem] = useState("");

    useEffect(() => {
        if(authState.user_id) {
            Axios.get(`http://localhost:3001/users/${authState.user_id}`).then((response) => {
                console.log(response.data);
                setUser(response.data);
            });


            Axios.get(`http://localhost:3001/games/yourOnes?who=user&id=${authState.user_id}`).then((response) => {
                setGameList(response.data);
            });

            Axios.get(`http://localhost:3001/subscriptions/user/${authState.user_id}`).then((response) => {
                setSubList(response.data);
            });

        }

        
    }, []);



    const EnterGame=(game_id)=>{
        
        Axios.post('http://localhost:3001/game/operation',{
            id:game_id, 
            //ArrivalDate:ArrivalDate,
            //DelistDate:DelistDate
        });
      };


    const redeemCode = () => {
        Axios.post('http://localhost:3001/redeems/use',{
            redeem: redeem,
            user_id: authState.user_id
        }).then((res) => {
            if(res.data.error) {
                toast.error(res.data.error)
            } else {
                toast.success(res.data);

                setTimeout(()=> {
                    navigate('/User');
                }, 500);
            }
        });
    }




    return (

        <div className="container">

                <br></br>
                <br></br>
                <h1 align="center">    USER PROFILE </h1>
                <br></br>
                <hr></hr>
                
                
                <div>
                    <h1 align="center">  <b>{user.name}</b>   </h1>
                    <hr></hr>
                    <br></br>
                    <h3 >
                        <b>Email: </b>  {user.email}
                    </h3>
                    <br></br>
                    <h3 >
                        <b>Gamer Tag: </b>  {user.gamer_tag}
                    </h3> 
                    
                    <br></br>
                    <h3 >
                        <b>Status: </b>  {user.status}
                    </h3>
                    <br></br>
                    <h3 >
                        <b>Wallet: </b>  {user.wallet} $
                    </h3>
                </div>
                
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                
                <h1 align="center">    List of Your Owned Games </h1>
                <br></br>
                
                <hr></hr>
                <br></br>
                <br></br>
                

                

    
                <div className='wrapper'>
                    {   
                        gamesList.map((game, key)=> {
                            
                            return(
                                <div className = 'card-container' key={key} onClick={()=>{EnterGame(game.id)}}>
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
                                                <b>
                                                {
                                                    //  game.adOns.map((addons) => addons.name)
                                                }</b>
                                            </p>
                                            
                                        </div>
                            
                                    </div>

                                    <br></br>
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

          
                <h1 align="center"> Your   subscriptions </h1>
                <br></br>
                <hr></hr>
                <br></br>

                

    
                <div className='wrapper'>
                    {   
                        subList.map((sub, key)=> {
                            
                            return(
                                <div className = 'card-container' key={key} onClick={() => { navigate(`/Subscription/${sub.subscription_id}`);}}> 
                                    
                            
                                    <div className='=card-content'>
                                        <div className='card-title'>
                                            <h3>{sub.name}</h3>
                                        </div>
                            
                                        <div className='card-body'>
                                            <p>
                                                {/* <b>Expire date: </b> {moment(sub.expire_date).format("L")} */}
                                                
                                                <b>Monthly Payment : </b> {sub.monthly_payment} $
                                                <br></br>
                                                <b>Total Games: </b> {sub.total_games}
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
                

                <hr></hr>
                <br></br>
                <br></br>
                <br></br>
                    <h1 align="center"> Redeem Here :</h1>
                    <br></br>
                <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"   onChange={(event) => {
                                setRedeem(event.target.value);
                            }}></input>
                            <label htmlFor="floatingInput">Write the code</label>
                </div>

                <div className="col"><button type="submit" className="btn btn-secondary "  onClick={redeemCode}>Redeem</button></div> 


                <br></br>
                <br></br>
           
        </div>
        

    );
};

export default User;