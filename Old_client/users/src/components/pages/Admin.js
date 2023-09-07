import Axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddGame from './AddGame';

const Admin = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/users/`).then((response) => {
            setUserList(response.data);
        });
    }, []);


    const deleteUser = (user_id) => {
        Axios.delete(`http://localhost:3001/users/${user_id}`).then((response) => {
          setUserList(
            userList.filter((val) => {
              return val.user_id !== user_id; // the true one will be filtered out
            })
          );

            toast.success("Successfully Deleted");

        });
    };



    return (
        <div className="container">
            <div className="py-4">
                <h1> Admin Page</h1>
                <br></br>
                <hr></hr>
                <br></br>
                
                <h2> Add a new game: </h2>
                <br></br>
                
                <AddGame />

                <br></br>
                <hr></hr>
                <br></br>

                <h2> User list: </h2>
                {
                    userList.map((user, key)=> {
                        return(
                          <div key={key} className="post" >
                            <div className="title"> {user.gamer_tag} </div>
                            <div className="body">
                                <b>Name : </b> {user.name} <br></br>
                                <b>Email: </b> {user.email} <br></br>

                            </div>
                            <div className="footer"> 
                                <button className="btn btn-danger" onClick={() => { 
                                    deleteUser(user.user_id);
                                }}>
                                    Delete this user
                                </button>

                                
                            </div>
                           
                          </div>
                        );
                    })

                }
            </div>
        </div>

    );
};

export default Admin;