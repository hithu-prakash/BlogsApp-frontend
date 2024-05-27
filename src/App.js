import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import { useEffect } from 'react';
import {useAuth} from "./context/useAuth"
import PrivateRouter from "./components/PrivateRouter"
import axios from './config/axios';

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import AddBlogs from './components/AddBlogs';
import AllBlogs from './components/AllBlogs';
import MyBlogs from './components/MyBlogs';
import SinglePost from './components/SingleBlogs';


function App() {
  const {user,dispatch}=useAuth()
  const registerIn=()=>{
    toast("successfully Registered !!")
     }

   const loggedIn=()=>{
      toast("successfully logged !!")
       }

       useEffect(()=>{
        if(localStorage.getItem("token")){
          (async()=>{
           const userResponse=await axios.get("/user/account",{
            headers:{
              Authorization:
                localStorage.getItem("token")
              
            }
           })
           console.log(userResponse.data)
          
            dispatch({type:"LOGIN",payload:{account:userResponse.data}})
          
          })();
        }
        },[])
        
  return (
    
      <div >
        <center>
        <h1>Blogs</h1>
        <Link to="/">Home </Link> |
        
        {!user.isLoggedIn ? (
          <>
          <Link to='/addblogs'>AddBlogs</Link> | 
          
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link> |
          
          </>
        ) : (
          <>
          <Link to="/account">Account</Link> |
          <Link to='/allblogs'>AllBlogs</Link>|
          <Link to='/myblogs'>MyBlogs</Link> |
          <Link to="/" onClick={()=>{
             localStorage.removeItem("token")
             dispatch({type:"LOGOUT"})
          }}  >  Logout</Link>| </>
        )}
        
           
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register registerIn={registerIn} />} />
            <Route path="/login" element={<Login loggedIn={loggedIn}/>} />
            
            <Route path="/account" element={
              <PrivateRouter>
                <Account />
              </PrivateRouter>
            } />
            <Route path='/addblogs' element={
              <PrivateRouter>
                <AddBlogs/>
              </PrivateRouter>} />
              <Route path='/allblogs' element={ <AllBlogs/>}/>
              <Route path='/myblogs' element={
            <PrivateRouter>
              <MyBlogs/>
            </PrivateRouter> }/>
            <Route path='/singlepost/:postId' element={
          <PrivateRouter>
            <SinglePost/>
          </PrivateRouter>
        }/>
          </Routes>
          
          </center>
          <ToastContainer/>
      </div>
    
  );
}

export default App;
