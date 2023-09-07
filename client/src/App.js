
import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery/dist/jquery.min.js';
import Admin from './components/pages/Admin';
import Admin_Login from './components/pages/Admin_Login';
import Admin_Options from './components/pages/Admin_Options';
import Buy from './components/pages/Buy';
import Deal from './components/pages/Deal';
import Deals from './components/pages/Deals';
import Deals_Add from './components/pages/Deals_Add';
import Developer from './components/pages/Developer';
import Developer_Login from './components/pages/Developer_Login';
import Developer_Register from './components/pages/Developer_Register';
import Game from './components/pages/Game';
import Home from './components/pages/Home';
import Home_Select from './components/pages/Home_Select';
import Landing from './components/pages/Landing';
import NavBar from './components/pages/NavBar';
import Publisher from './components/pages/Publisher';
import Publisher_Login from './components/pages/Publisher_Login';
import Publisher_Register from './components/pages/Publisher_Register';
import Subscription from './components/pages/Subscription';
import Subscriptions from './components/pages/Subscriptions';
import Sub_Add from './components/pages/Sub_Add';
import Types from './components/pages/Types';
import User from './components/pages/User';
import User_Login from './components/pages/User_Login';
import User_Register from './components/pages/User_Register';
import Wishlist from './components/pages/Wishlist';
import { AuthContext } from "./helpers/AuthContext";


function App() {

   const [authState, setAuthState] = useState({
      user_name: "",
      user_id: null,
      user_wallet: null,
      user_is_logged: false,
      developer_name: "",
      developer_id: null,
      developer_status: null,
      developer_is_logged: false,
      publisher_name: "",
      publisher_id: null,
      publisher_status: null,
      publisher_is_logged: false,

      
    });
    

  useEffect(()=> {

    console.log(localStorage.getItem("userToken") );
    console.log(localStorage.getItem("developerToken") );
    console.log(localStorage.getItem("publisherToken") );

    if(localStorage.getItem("userToken")) {
        axios.get("http://localhost:3001/users/auth",{
          headers: {
                userToken: localStorage.getItem("userToken"),
          }
          }).then((res)=>{
              // console.log(res.data);
              if (res.data.error) {
              setAuthState({ ...authState, user_is_logged: false });
            } else {
              // console.log(res.data);
              setAuthState({
                user_name: res.data.user_name,
                user_id: res.data.user_id,
                user_wallet: res.data.user_wallet,
                user_is_logged: true,

                developer_name: "",
                developer_id: null,
                developer_status: null,
                developer_is_logged: false,

                publisher_name: "",
                publisher_id: null,
                publisher_status: null,
                publisher_is_logged: false

              });
            }
          });
    }

    if(localStorage.getItem("developerToken")) {
        axios.get("http://localhost:3001/developers/auth",{
          headers: {
                developerToken: localStorage.getItem("developerToken"),
          }
          }).then((res)=>{
            // console.log("dEVELOPER");
              // console.log(res.data);
              if (res.data.error) {
              setAuthState({ ...authState, developer_is_logged: false });
            } else {
              setAuthState({
                developer_name: res.data.developer_name,
                developer_id: res.data.developer_id,
                developer_status: res.data.developer_status,
                developer_is_logged: true,

                user_name: "",
                user_id: null,
                user_wallet: null,
                user_is_logged: false,

                publisher_name: "",
                publisher_id: null,
                publisher_status: null,
                publisher_is_logged: false
              });
            }
          });
    }

    if(localStorage.getItem("publisherToken")) {
        axios.get("http://localhost:3001/publishers/auth",{
          headers: {
                publisherToken: localStorage.getItem("publisherToken"),
          }
          }).then((res)=>{
              console.log(res.data);
              if (res.data.error) {
              setAuthState({ ...authState, publisher_is_logged: false });
            } else {
              setAuthState({
                publisher_name: res.data.publisher_name,
                publisher_id: res.data.publisher_id,
                publisher_status: res.data.publisher_status,
                publisher_is_logged: true,

                user_name: "",
                user_id: null,
                user_wallet: null,
                user_is_logged: false,

                developer_name: "",
                developer_id: null,
                developer_status: null,
                developer_is_logged: false
              });
            }
          });
    }
    
    // console.log("MELLO");
    // console.log(authState);

   }, []);

   return (

      <div className="App">

      <AuthContext.Provider value={{ authState, setAuthState }}>
       
      <BrowserRouter>
         <NavBar />
         <Routes>
          
           
           
            <Route exact path="/" element={<Landing/>} />
            <Route exact path="/User_Login" element={<User_Login/>} />
            <Route exact path="/User_Register" element={<User_Register />} />
            <Route exact path="/Admin_Options" element={<Admin_Options/>} />
            <Route exact path="/Admin_Login" element={<Admin_Login />} />
            <Route exact path="/Admin" element={<Admin/>} />
            <Route exact path="/Developer_Login" element={<Developer_Login />} />
            <Route exact path="/Developer_Register" element={<Developer_Register />} />
            <Route exact path="/Developer" element={<Developer/>} />
            <Route exact path="/Publisher_Login" element={<Publisher_Login/>} />
            <Route exact path="/Publisher_Register" element={<Publisher_Register />} />
            <Route exact path="/Publisher" element={<Publisher />} />
            <Route exact path="/Home" element={<Home/>} />
            <Route exact path="/Home_Select/:id" element={<Home_Select/>} />
            <Route exact path="/Types" element={<Types />} />
            <Route exact path="/Game/:id" element={<Game />} />
            <Route exact path="/Buy/:id" element={<Buy />} />
            <Route exact path="/User" element={<User />} />
            <Route exact path="/Wishlist" element={<Wishlist />} />

            <Route exact path="/Deals_Add/:id" element={<Deals_Add/>} />
            <Route exact path="/Deals" element={<Deals/>}/>
            <Route exact path="/Deal/:id" element={<Deal/>}/>

            <Route exact path="/Sub_Add/:id" element={<Sub_Add />} />
            <Route exact path="/Subscriptions" element={<Subscriptions/>} />
            <Route exact path="/Subscription/:id" element={<Subscription/>} />

         </Routes>

         <ToastContainer />
         

      </BrowserRouter>

      </AuthContext.Provider>
      

      </div>


   );
}

export default App;
