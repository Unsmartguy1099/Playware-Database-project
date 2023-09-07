import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";
import './Card.css';


const Developer = () => {


  
  const {authState} = useContext(AuthContext);

  const [dev, setDev] = useState({});
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [images, setImages] = useState([]);
  const [gamesList, setGameList] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [addOnsList, setAddOnsList] = useState([]);
  const [addOnsName, setAddOnsName] = useState("");
  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState("");


  const addGame = () => {

    if(authState.developer_status !== "Registered") {
          toast.error("You're not registered yet! Please contact your publishser..")
          return;
    }

    const formData = new FormData();

    formData.append('image', images[0]);

    // console.log(formData);

    const url = "https://api.imgbb.com/1/upload?key=bf474a7ad7a850314853ed811e1f83e3";

    fetch(url, {
      method: 'POST',
      body: formData
    }).then(res=>res.json())
    .then((result) => {

      console.log(result);

      if(result.success) {
          Axios.post("http://localhost:3001/games/developed", {
              name: name,
              genre: genre,
              img_src: result.data.url,
              developer_id: authState.developer_id
            }).then((response) => {
             toast.success(response.data)
            });
      } else {
          toast.error("Image uploading failed!")
      }
      
    });
};


    const pullGame = (game_id, state) => {
        if(state==11)
            state=9;
        if(state==10)
            state=8;
        if(state==2)
            state=5;
        if(state==3)
            state=6;
        if(state==4)
            state=7;

        Axios.put("http://localhost:3001/games/updateStatus", {
                state: state,
                game_id: game_id
            }).then((response) => {
                if(response.data.success)
                    toast.success("Successfully pulled the game from Store");
            });
    };

    const reqToPublish = (game_id, state) => {
        if(state == 1)
            state = 2;

        
        Axios.put("http://localhost:3001/games/updateStatus", {
                state: state,
                game_id: game_id
            }).then((response) => {
                if(response.data.success)
                    toast.success("Successfully requested the game for publishing");
            });
    };


    const addAddons= () => {

       
        Axios.post("http://localhost:3001/dlc/", {
          dlc_name: addOnsName,
          game_name: gameName,
          price: price,
          developer_id: authState.developer_id
          }).then((response) => {
                if(response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success(response.data);
                }
          });
   
    };

    const deleteAddOns = (AddOns_id) => {

        Axios.delete(`http://localhost:3001/dlc?id=${AddOns_id}`).then((response) => {
            toast.success("Deleted");
          });
   
    };


 

  useEffect(() => {
      
      if(authState.developer_id) {


        Axios.get(`http://localhost:3001/games/yourOnes?who=developer&id=${authState.developer_id}`).then((response) => {
            setGameList(response.data);
        });


        Axios.get(`http://localhost:3001/developers/getPublisher/${authState.developer_id}`).then((response) => {
            setPublisher(response.data);
        });

        Axios.get(`http://localhost:3001/developers/count?id=${authState.developer_id}`).then((response) => {
            setDev(response.data);
        });

        Axios.get(`http://localhost:3001/dlc/developer?id=${authState.developer_id}`).then((response) => {
            setAddOnsList(response.data);
        }); 
      }
     
  }, [authState]);


    return (
        <div className="container">
            <div className="py-4">
                
                <div className="row mb-4">
                    
                    <hr></hr>

                    <div className="col-lg-5"> <img src = "https://i.ibb.co/Bt6JCNj/708382-people-512x512.png" alt="developer" width = "300px" height="300px" />_</div>
                    <div className="col-lg-5">

                        <h2> <b>Your informations: </b></h2>
                        <hr></hr>
                        
                        <h4> Name:  {authState.developer_name}</h4>
                        <h4> Status:  {authState.developer_status}</h4>
                        <h4> Publisher: {publisher}</h4>
                        <hr></hr>
                        <h4> Total games: {dev.total_g} </h4> 
                        <h4> Games in developed state: {dev.total_dg} </h4> 
                        <h4> Games in published state: {dev.total_pg} </h4>
                        <h4> Games in store: {dev.total_sg} </h4>
                        <br></br>

                        

                    </div>
                    <div className="col-lg-2"></div>
                    
                </div>

               <hr></hr>
               <br></br>
               <br></br>
               

               <h2><b>Game Upload Section: </b></h2>
               <br></br>
               <br></br>

                <div className="row mb-3">
                    


                    <div className="col-lg-3"></div>
                    

                    <div className="col-lg-6 border shadow rounded p-3">
                        <h2>Game Description:</h2>


                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                                setName(event.target.value);
                            }}></input>
                            <label htmlFor="floatingInput">Name</label>
                        </div>


                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                                setGenre(event.target.value);
                            }}></input>
                            <label htmlFor="floatingInput">Genre</label> 
                        </div>

                        <label className="mb-2">    Photo : </label> 
                        <br></br>
                    
                        <input type="file" accept="image/*" className="form-control mb-3"  placeholder="img.png/jpg/jpeg..." onChange={(event) => {
                        setImages([...event.target.files]);
                        }}></input>
                  
                  
               

                    <div className="row">
                    <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <button type="submit" className="btn btn-secondary container-fluid"  onClick={addGame}>Add Game</button>
                        </div> 
            
                        <div className="col-lg-4"></div> 

                    </div> 
                                    
                </div>
                
                <div className="col-lg-3"></div>


                </div>
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>

                <div className="row mb-4">
                <h2><b>Developed Games List:</b></h2>
                <br></br>
                <br></br>
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
                                                        <b>Price : </b>  {game.price}
                                                        <br></br>
                                                        <b>Status : </b> < i> {game.status} </i> 

                                                    </p>
                                                    
                                                </div>
                                    
                                            </div>

                                            <br></br>

                                            {
                                                    game.status === "Developed" ? 
                                                    <div className='btn' >
                                                        <button type="submit" onClick={ () => 
                                                            reqToPublish(game.game_id, game.state)} >
                                                            <b>
                                                            Request To Publish
                                                            </b>
                                                        </button>
                                                    </div> : 
                                                    
                                                    <div className='btn' >
                                                        <button  type="submit" onClick={ () => 
                                                            pullGame(game.game_id, game.state)} >
                                                            <b>
                                                            Request To Pull
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

                    <div className="col-lg-3"></div>

                    <div className="col-lg-6 border shadow rounded p-3">

                        <h2> <b> Add Ons Upload Section: </b> </h2>
                        <br></br>


                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setAddOnsName(event.target.value);
                            }}></input>
                            <label for="floatingInput">Name</label>
                        </div>


                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setGameName(event.target.value);
                            }}></input>
                            <label for="floatingInput">Game Name</label> 
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => {
                            setPrice(event.target.value);
                            }}></input>
                            <label for="floatingInput">Price</label> 
                        </div>


                        <div className="row">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4"><button type="submit" className="btn btn-secondary container-fluid"  onClick={addAddons}>Add</button></div> 
                            <div className="col-lg-4"></div>  
                        </div> 

                    </div>

                    <div className="col-lg-3"></div>

                </div>






                <br></br>
                <br></br>
                <hr></hr>
                



                <div className="row mb-4">

                     <h2> <b> Add Ons: </b></h2>
                     <br></br>
                     <br></br>
                     <hr></hr>
                     <br></br>
                    <br></br>


                    <div className="col-lg-12 col-lg-6 border shadow rounded p-3">

                        <div className="container">
                        


                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <br></br>

                    
                            <h1 align="center">  List of AddOns </h1>
                            <hr></hr>
                            <br></br>
                
                            <div className='wrapper'>
                                {   
                                    addOnsList.map((addOns, key)=> {
                                        
                                        return(
                                            <div className = 'card-container' key={key}>
                                            
                                                <div className='=card-content'>
                                                    <div className='card-title'>
                                                        <h3>{addOns.name}</h3>
                                                    </div>
                                        
                                                    <div className='card-body'>
                                                        <p>
                                                        
                                                            <br></br>
                                                            <b>Price : </b> {addOns.price} $
                                                            <br></br>
                                                            <b>Game : </b> {addOns.game_name}
                                                            <br></br>
                                                        
                                                        </p>
                                                        
                                                    </div>
                                        
                                                </div>

                                                <br></br>
    
                                                <div className='btn' >
                                                    <button type="submit" onClick={ () => 
                                                        deleteAddOns(addOns.dlc_id)} >
                                                        <b>
                                                        Delete
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

                    </div>
                </div>

            </div>
        </div>

    );
};


export default Developer;