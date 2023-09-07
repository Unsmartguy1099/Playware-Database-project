import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";
import './Card.css';





const Buy = () => {

  	let {id} = useParams();
    const [rating, setRating] = useState(5);
    const [ratingView, setRatingView] = useState([]);
    const [ReviewList,setReviewList]=useState([]);
    const [AddOnsList, setAddOnsList] = useState([]);
    const [Review,setReview]=useState({});
    const [game,setGame]=useState({});
    const [bought, setBought] = useState(false);

    const {authState} = useContext(AuthContext);

    useEffect(() => {

        Axios.get(`http://localhost:3001/games/byId/${id}`).then((response) => {  
            setGame(response.data);
        });

        if(authState) {
            Axios.get(`http://localhost:3001/games/bought?user_id=${authState.user_id}&game_id=${id}`).then((response) => {
                console.log(response.data);
                setBought(response.data);
            });
        }
        
        Axios.get(`http://localhost:3001/Rating/`,{
            id:id
        }).then((response) => {
            setRatingView(response.data);
        });

        Axios.get(`http://localhost:3001/games/reviews?game_id=${id}`).then((response) => {
            setReviewList(response.data);
        });

        Axios.get(`http://localhost:3001/dlc/game?name=${game.name}`).then((response) => {
            setAddOnsList(response.data);
        });
    
        
   
        // Axios.get(`http://localhost:3001/AddOns/`,
        // {
        //     id:id
        // }).then((response) => {
        //     setReviewList(response.data);
        // });
    
        
    }, [authState]);


    const SubmitRating= () => {
        if(!bought) {
            toast.error("You have to buy the game before rating!");
            return;
        }
        Axios.put("http://localhost:3001/games/addRating", {
         rating:rating,
         game_id: id,
         user_id: authState.user_id
         
          }).then((response) => {
           toast.success(response.data)
          });
   
    };

    const Buy= () => {
        if(bought) {
            toast.error("You alreay bought this!");
            return;
        }

        Axios.post("http://localhost:3001/games/buy", {
         game_id:id,
         user_id: authState.user_id
        }).then((response) => {
           toast.success(response.data)
          });
    };

    const AddToWishlist = () => {
       

        Axios.post("http://localhost:3001/games/addWishlist", {
    
                game_id: id,
                user_id: authState.user_id,
        
            }).then((response) => {
                if(!response.data.error)
                    toast.success(response.data);
                else 
                    toast.error("Already added to wishlist")
            });
    };

    const BuyAddOns = (AddOns_id) => {
        Axios.post("http://localhost:3001/AddOns", {
          AddOns_id:AddOns_id
          }).then((response) => {
          });
    };

    const addReview = () =>{
        if(!bought) {
            toast.error("You have to buy the game before giving review!");
            return;
        }
        Axios.put("http://localhost:3001/games/addReview", {
        review:Review,
         game_id: id,
         user_id: authState.user_id
         
          }).then((response) => {
           toast.success(response.data)
          });
    }
    

    return (

        <div className="container">
            <div className="py-4">






            <div className="row mb-4">
            <div className="col-lg-12 col-lg-6 border shadow rounded p-3"><img className="container-fluid" src={game.img_src}  border="0" height="600px" width="200px" /></div>
            </div>
            <div className="row mb-4">
            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
                <b>Name  : </b> {game.name} <br></br>
                <b>Total Sales: </b> {game.total_sales} <br></br>
                <b>Price : </b> {game.price} <br></br>
                <b>Rating: </b> 4.5 <br></br>
            </div>
            </div>

            <div className="row">
                <div className="col-lg-12   rounded p-3">
                <div className="row">
                        <div className=" col-lg-5 border shadow rounded p-3 mx-4">
                                                    <div className='btn border shadow rounded mb-4' >
                                                        <button  type="submit" onClick={ () => 
                                                            Buy()} >
                                                            <b>
                                                            Buy
                                                            </b>
                                                        </button>
                                                
                                                     </div>
                                                     <div className='btn border shadow rounded' >
                                                        <button  type="submit" onClick={ () => 
                                                            AddToWishlist()} >
                                                            <b>
                                                            +Wishlist
                                                            </b>
                                                        </button>
                                                
                                                     </div>
                        </div>
                        <div className=" col-lg-1 p-3 "></div>
                        <div className=" col-lg-5 border shadow rounded p-3 mx-4">
                        <div className="border shadow rounded mb-3">Rating: {ratingView}</div> 


<div className="row mb-2"> 
    <div className="col-lg-10"><input type="range" class="form-range" min="0" max="5" step="1" id="customRange3"  onChange={(event) => {
        setRating(event.target.value);
      }}></input></div>
    <div className="col-lg-2"> {rating}</div>
</div>




                      
     
                                                     <div className='btn border shadow rounded' >
                                                        <button  type="submit" onClick={ () => 
                                                            SubmitRating()} >
                                                            <b>
                                                            Submit Rating
                                                            </b>
                                                        </button>
                                                        
                                                
                                                     </div>   
                                                         
                        </div>  
                </div>
            </div>
            </div>

           














{//----ReviewNote---------------------------------------------------------------
}










  
            <div className="row mb-4 mt-4">

                            <div className="col-lg-3"></div>
                            <div className="col-lg-6 border shadow rounded p-3">
                                <h2>Review Note:</h2>


                            <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setReview(event.target.value);
                            }}></input>
                            <label for="floatingInput">Review</label>
                            </div>


                            <div className="row">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4"><button type="submit" className="btn btn-secondary container-fluid"  onClick={addReview}>Add</button></div> 
                            <div className="col-lg-4"></div>  
                            </div> 

                            </div>
                            <div className="col-lg-3"></div>

            </div>
                        


            <div className="row mb-4">
                  <h2>Reviews:</h2>
            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
            <div className="container">
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <h1 align="center">    List of Reviews </h1>
                <hr></hr>
                <br></br>
                <div className='wrapper'>
                    {   
                        ReviewList.map((review, key)=> {
                            
                            return(
                                <div className = 'card-container' key={key}>
                                   
                                    <div className='=card-content'>
                                        <div className='card-title'>
                                            <h3>{review.name}</h3>
                                        </div>
                            
                                        <div className='card-body'>
                                            <p>
                                               
                                                <br></br>
                                                <b>Review : </b> {review.review} 
                                                <br></br>
                                               
                                               
                                            </p>
                                            
                                        </div>
                            
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

     {
        //--------------------------------------------------------------------------------------------------------------
     }        








<div className="row mb-4">
                  <h2>AddOns:</h2>
            <div className="col-lg-12 col-lg-6 border shadow rounded p-3">
            <div className="container">
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <h1 align="center">    List of AddOns </h1>
                <hr></hr>
                <br></br>
                <div className='wrapper'>
                    {   
                        AddOnsList.map((AddOns, key)=> {
                            
                            return(
                                <div className = 'card-container' key={key}>
                                   
                                    <div className='=card-content'>
                                        <div className='card-title'>
                                            <h3>{AddOns.name}</h3>
                                        </div>
                            
                                        <div className='card-body'>
                                            <p>
                                               
                                                <br></br>
                                                <b>Price : </b> {AddOns.price} $
                                                <br></br>
                                                <b>Total sales : </b> {AddOns.Game}
                                                <br></br>
                                               
                                            </p>
                                            
                                        </div>
                            
                                    </div>

                                    <br></br>
                            
                                                    {/* <div className='btn' >
                                                        <button type="submit" onClick={ () => 
                                                            BuyAddOns(AddOns.AddOns_id)} >
                                                            <b>
                                                            Buy
                                                            </b>
                                                        </button>
                                                    </div>  */}
                                                    
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

export default Buy;