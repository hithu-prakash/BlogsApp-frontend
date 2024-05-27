import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../config/axios"

export default function Account() {
    const {user,dispatch} = useAuth()
    const navigate = useNavigate()

    const[form,setForm]=useState({
        username : user.profile ? user.profile.username:"",
        email : user.profile ? user.profile.email:"",
        bio: user.profile ? user.profile.bio:"",
    })

    const handleChange=(e)=>{
        const { value, name } = e.target 
        setForm({...form, [name]: value })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(user.profile)
        if(user.profile) {
            // api to update
            const response = await axios.put('/user/update', form, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            alert('profile update')
            dispatch({ type: 'SET_PROFILE', payload: response.data})
        } else {
            const response = await axios.post('/user/register', form, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        alert('profile created')
        dispatch({ type: 'SET_PROFILE', payload: response.data})
        }
    }

    const handleToggle = () => {
        setForm({...form, isEdit: !form.isEdit })
    }
    return(
        <div>
            <h1>Account</h1>

            

            <p>Username:{user.account.username}</p>
            <p>Email:{user.account.email}</p>
            <p>Bio:{user.account.bio}</p>
            
            <button onClick={handleToggle}> { form.isEdit ? 'Cancel' : 'Edit' }</button>
            <form onSubmit={handleSubmit}></form>

            <form>
            <label htmlFor="username">Username :</label>
            <input 
                    type="text" 
                    value={form.username} 
                    onChange={handleChange}
                    name="username" 
                    id="username"
            />
            <br />
            <label htmlFor="email">email :</label>
            <input 
                    type="text" 
                    value={form.email} 
                    onChange={handleChange}
                    name="email" 
                    id="email"
            />
            <br />
            <label htmlFor="bio">Bio :</label>
            <input 
                    type="text" 
                    value={form.bio} 
                    onChange={handleChange}
                    name="bio" 
                    id="bio"
            />
            <br/>
            { form.isEdit && <input type="submit" />  }
            </form>
        </div>
    )
}