import axios from "../config/axios"
import { useState } from "react"
import _ from "lodash"
import {useNavigate}from "react-router-dom"

export default function Register({registerIn}){
    const navigate=useNavigate()
    const [form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        profilePic:null,
        bio:"",
        serverErrors:null,
        clientErrors:{}
    })
    const errors={}
    const runValidations = () => {

        if(form.username.trim().length == 0) {
            errors.username = 'username is required'
        }

        if(form.email.trim().length == 0) {
            errors.email = 'email is required'}
        // } else if(!validator.isEmail(form.email)) {
        //     errors.email = 'invalid email format'
        // }

        if(form.password.trim().length == 0) {
            errors.password = 'password is required'
        } else if(form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'invalid password length'
        }

        if(form.bio.trim().length == 0) {
            errors.bio = 'bio is required'
        }
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
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData=_.pick(form,["username","email","password","bio","profilePic"])
        console.log(formData)
        // const formData = new FormData();
        // formData.append('username', form.username);
        // formData.append('email', form.email);
        // formData.append('password', form.password);
        // formData.append('bio', form.bio);
        // formData.append('profilePic', form.profilePic);

        runValidations()

        if(Object.keys(errors).length == 0 ) {
        try{
            const response=await axios.post("/user/register",formData)
            navigate("/login")
            console.log(response.data)
             registerIn()      
        }
        catch(e){
            console.log(e)
            setForm({...form, serverErrors: e.response.data.errors, clientErrors: {} })
        }
    }else{
        setForm({...form, clientErrors: errors})
    }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({...form,profilePic:file});
      }


    return (
        <div>
            <h1>Register Here</h1>
            {/* { serverErrors && (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    
                    <ul>
                        { serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div> 
            )} */}


            { form.serverErrors && displayErrors() } 
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
            
                <label htmlFor="username"> Enter Username </label>
                <input type="text"
                  onChange={e=>setForm({...form,username:e.target.value})}
                  id="username"
                  value={form.username}/>
                   { form.clientErrors.username && <span> { form.clientErrors.username } </span>}
                  <br/>
                  <label htmlFor="email">Enter Email</label>
                  <input type="text"
                  onChange={e=>setForm ({...form,email:e.target.value})}
                  id="email"
                  value={form.email}/>
                   { form.clientErrors.email && <span> { form.clientErrors.email } </span>}
                    <br/>

                  <label htmlFor="password">Enter password</label>
                  <input type="password"
                  onChange={e=>setForm({...form,password:e.target.value})}
                  value={form.password}
                  id="password"/>
                   { form.clientErrors.password && <span> { form.clientErrors.password } </span>}
                  <br/>
                
                  <label htmlFor="bio">Bio</label>
                  < input type="textarea"
                  onChange={e=>setForm({...form,bio:e.target.value})}
                  value={form.bio}
                  id="bio"/>
                   { form.clientErrors.bio && <span> { form.clientErrors.bio } </span>}
                  <br/>

                  <label >Update-profile</label>
                 <input type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  />
                  <br/>

                  <input type="submit"/>
            </form>
        </div>

    )
}