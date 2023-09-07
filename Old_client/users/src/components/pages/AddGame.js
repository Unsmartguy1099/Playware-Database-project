import Axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function AddGame() {

    let navigate = useNavigate();

    const [release_date, setRelease_Date] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");

    const addGame = () => {
        Axios.post("http://localhost:3001/games", {
          name:name,
          price: price,
          genre:genre,
          release_date: release_date
          
        }).then(() => {
      
          toast.success("Game Added");
      
          setTimeout(()=> {
            navigate('/game');
          }, 3000);
      
         
        });
    };

  return (

            <div className='container'>
                <div className="col border shadow rounded p-3">
                

                    <div className="form-floating mb-3">
                        <input type="text" size="lg" className="form-control" id="floatingInput"  onChange={(event) => {
                            setName(event.target.value);
                        }}></input>
                        <label htmlFor="floatingInput">Game Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" size="lg" className="form-control" id="floatingInput"  onChange={(event) => {
                            setGenre(event.target.value);
                        }}></input>
                        <label htmlFor="floatingInput">Genre</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="number" size="lg" className="form-control" id="floatingInput"  onChange={(event) => {
                            setPrice(event.target.value);
                        }}></input>
                        <label htmlFor="floatingInput">Price</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="date" size="lg" className="form-control" id="floatingInput"  onChange={(event) => {
                            setRelease_Date(event.target.value);
                        }}></input>
                        <label htmlFor="floatingInput">Release Date</label>
                    </div>

                    <button type="submit" className="btn btn-secondary" onClick={addGame}>Submit</button>

                
                </div>
            </div>
    
            
  )
}

export default AddGame