import { useState } from "react";
 
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
//import EditUser from "./EditUser";
//import Mypost from "./Mypost";

export default function Account() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isEdit,setIsEdit]=useState(false)
    const handlePost=()=>{
        navigate("/myposts")
    }

    const handleEdit=()=>{
       // setIsEdit(true); 
        navigate("/editUser")
    }

    const handleClick = () => {
        navigate("/AddBlogs");
    }
    // const handleToggle = () => {
    //     setIsEdit(!isEdit)
    // }
    

    if (!user || !user.account) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>My Account</h1>
            {/* {user.account.profilePic && (
                <img src={`http://localhost:4444/backend/images/${user.account.profilePic}`} alt="Profile" width="200" height="200" />
            )} */}
            <p>Username - {user.account.username}</p>
            <p>Email - {user.account.email}</p>
            <p>Bio - {user.account.bio}</p>
            {/* <h3>For create my post Area</h3> */}
            <button onClick={handleClick}>Create Blog</button>
            <button onClick={handleEdit}>Edit</button>
            {/* <button onClick={handlePost}>Myposts</button> */}
            
        </div>
    );
}