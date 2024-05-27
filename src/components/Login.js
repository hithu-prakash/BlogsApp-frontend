import {useFormik} from "formik"
import * as yup from "yup"
import axios from "../config/axios"
import {useAuth} from "../context/useAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const loginvalidation=yup.object({
    email:yup.string().required().email(),
    password:yup.string().required().min(8).max(128)
})

export default function Login({loggedIn}) {
    const {dispatch,user}=useAuth()
    const navigate=useNavigate()
    const [serverErrors,setServerErrors]=useState('')

    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validateOnChange:false,
        validationSchema:loginvalidation,
        onSubmit:async(values)=>{
            try{
                const response=await axios.post('/user/login',values)
                localStorage.setItem('token',response.data.token)
                loggedIn()
               
                const userResponse=await axios.get("/user/account",{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                    
                })
                console.log("userResponse",userResponse.data)
                dispatch({type:"LOGIN",payload:{account:userResponse.data}})
                navigate('/')
            } catch(e){
                console.log(e)
                setServerErrors(e.response.data.errors)
            }

        }
    })
    return(
        <div>
            <h1>Login With Us</h1>
            {serverErrors && <b>{serverErrors}</b>}
            <form onSubmit={formik.handleSubmit}>
                <label>Enter Email</label>
                <input type="text"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}/>
                {formik.errors.email}
                <br />

                <label>Enter Password</label>
                <input type="Password"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}/>
                {formik.errors.password}
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}