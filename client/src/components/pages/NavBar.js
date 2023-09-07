import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";


const NavBar = () => {


  const {authState, setAuthState} = useContext(AuthContext);
  let navigate = useNavigate();
  
  const userLogout = ()=> {
    // console.log(authState.user_name, authState.user_id);
    localStorage.removeItem("userToken");

    setAuthState({
      user_name: "",
      user_id:  null,
      user_wallet: null,
      user_is_logged: false,

      developer_name: "",
      developer_id: null,
      developer_status: null,
      developer_is_logged: false,

      publisher_name: "",
      publisher_id: null,
      publisher_status: null,
      publisher_is_logged: false

    });

    toast.success("Logged Out !");

    navigate('/User_Login');

  }

  const developerLogout = ()=> {
    
    localStorage.removeItem("developerToken");

    setAuthState({
      user_name: "",
      user_id:  null,
      user_wallet: null,
      user_is_logged: false,

      developer_name: "",
      developer_id: null,
      developer_status: null,
      developer_is_logged: false,

      publisher_name: "",
      publisher_id: null,
      publisher_status: null,
      publisher_is_logged: false

    });

    toast.success("Logged Out !");

    navigate('/Developer_Login');

  }

  const publisherLogout = ()=> {

    localStorage.removeItem("publisherToken");

    setAuthState({
      user_name: "",
      user_id:  null,
      user_wallet: null,
      user_is_logged: false,

      developer_name: "",
      developer_id: null,
      developer_status: null,
      developer_is_logged: false,

      publisher_name: "",
      publisher_id: null,
      publisher_status: null,
      publisher_is_logged: false

    });

    toast.success("Logged Out !");

    navigate('/Publisher_Login');

  }

  // const adminLogout = ()=> {

  //   setAuthState({
  //     user_name: "",
  //     user_id:  null,
  //     user_is_logged: false,

  //     developer_name: "",
  //     developer_id: null,
  //     developer_status: null,
  //     developer_is_logged: false,

  //     publisher_name: "",
  //     publisher_id: null,
  //     publisher_status: null,
  //     publisher_is_logged: false

  //   });

  //   toast.success("Logged Out !");

  //   navigate('/Admin_Login');

  // }



  return (
    <div className="container-fluid">

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/Home">Playware</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"             aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                  <li className="nav-item mx-2">
                        <Link className="btn btn-outline-success mr-3" to="/Home">Home</Link>
                  </li>

                  
                 {
                   ( !authState.user_is_logged  && !authState.developer_is_logged && !authState.publisher_is_logged) 
                   &&  <>
                        <li className="nav-item mx-2">
                            <Link className="btn btn-outline-success mr-3" to="/User_Login">Log in</Link>
                        </li>   
                        <li className="nav-item ">
                          <Link className="btn btn-outline-secondary" to="/Admin_Options">Admin Options</Link>
                        </li>  
                      </>
                           
                 }

                 {
                      (authState.user_is_logged) 
                      &&  <>

                            <li className="nav-item "  >
                              <Link className="btn btn-outline-secondary" to="/User">Profile</Link>
                            </li>

                            <li className="nav-item "  >
                              <Link className="btn btn-outline-secondary" to="/Wishlist">Wishlist</Link>
                            </li>
                            <li className="nav-item "  >
                              <Link className="btn btn-outline-secondary" to="/Types">Types</Link>
                            </li>
                            <li className="nav-item "  >
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={userLogout}> Log Out  <i> ( {authState.user_name} ) </i></button>
                            </li>
                      
                          </>

                 }

                {
                      (authState.developer_is_logged) 
                      &&  <>
                      
                            <li className="nav-item "  >
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={developerLogout}> Log Out  <i> ( {authState.developer_name} ) </i></button>
                            </li>
                      
                          </>

                 }

                {
                      (authState.publisher_is_logged) 
                      &&  <>
                      
                            <li className="nav-item "  >
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={publisherLogout}>Log Out  <i> ( {authState.publisher_name} ) </i></button>
                            </li>
                      
                          </>

                 }
                    
                  
                </ul>

               
                
                  
      
            </div>
        </div>
      </nav>

    </div>

  );
};

export default NavBar;