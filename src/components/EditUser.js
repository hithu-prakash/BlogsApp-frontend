import {useState}from "react"
import { useAuth } from "../context/useAuth"
import axios from "../config/axios"
import { useNavigate } from "react-router-dom"
import AllBlogs from "./AllBlogs"

export default function EditUser(){
    const navigate=useNavigate()
    const {user}=useAuth()
    const [form, setForm] = useState({
        username: user.account ? user.account.username: '',
        email: user.account ? user.account.email: '',
        bio: user.account? user.account.bio: '',
        //profilePic:user.account?user.account.profilePic:null,
        clientErrors: {},
        isEdit: false, 
        serverErrors: null 
    })
    
    const handleChange = (e) => {
        const { value, name } = e.target 
        setForm({...form, [name]: value })
    }
    
    const displayErrors = () => {
        let result 
        if(typeof form.serverErrors == 'string') {
            result = <p> { form.serverErrors } </p>
        } else {
            result = (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { form.serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div>
            )
        }
        return result 
    }
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     const dataUrl = reader.result;
//     setForm({ ...form, profilePic: dataUrl });
//   };
//   reader.readAsDataURL(file);
//       };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/user/update", form, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("edit data", response.data);
      setForm(response.data);
      navigate("/AllBlogs");
    } catch (error) {
      console.log(error.response.data);
      setForm({ ...form, serverErrors: error.response.data });
    }
  };
  
    return (
        <div>
        { form.serverErrors && displayErrors() } 
        {/* <button onClick={handleEditComplete}>Finish Editing</button> */}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
       
            <label htmlFor="username"> Enter Username </label>
            <input type="text"
              onChange={handleChange}
              id="username"
              value={form.username}
            //   disabled={!form.isEdit}
              name="username"
              />
               { form.clientErrors.username && <span> { form.clientErrors.username } </span>}
              <br/>
              <label htmlFor="email">Enter Email</label>
              <input type="text"
              onChange={handleChange}
              id="email"
              value={form.email}
              name="email"/>
               {/* disabled={!form.isEdit} */}
            
               { form.clientErrors.email && <span> { form.clientErrors.email } </span>}
              <br/>

              
             
            
              <label htmlFor="bio">Bio</label>
              < input type="textarea"
              onChange={handleChange}
              value={form.bio}
              id="bio"
              //disabled={!form.isEdit}
              name="bio"/>
               { form.clientErrors.bio&& <span> { form.clientErrors.bio } </span>}
              <br/>
             {/* <label >Update-profile</label>
             <input type="file"
              name="profilePic"
              onChange={handleFileChange}
              //disabled={!form.isEdit}
              />
              <br/> */}
           <input type="submit"/>
              {/* { form.isEdit && <input type="submit" />  } */}
        </form>
    </div>

)
}
    