// import {useFormik} from "formik"
// import * as yup from "yup"
// import axios from "../config/axios"
// import {useAuth} from "../context/useAuth"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { TextField,  Button, Typography, styled } from '@mui/material';

// const loginvalidation=yup.object({
//     email:yup.string().required().email(),
//     password:yup.string().required().min(8).max(128)
// })

// export default function Login({loggedIn}) {
//     const {dispatch,user}=useAuth()
//     const navigate=useNavigate()
//     const [serverErrors,setServerErrors]=useState('')

//     const formik=useFormik({
//         initialValues:{
//             email:"",
//             password:""
//         },
//         validateOnChange:false,
//         validationSchema:loginvalidation,
//         onSubmit:async(values)=>{
//             try{
//                 const response=await axios.post('/user/login',values)
//                 localStorage.setItem('token',response.data.token)
//                 loggedIn()
               
//                 const userResponse=await axios.get("/user/account",{
//                     headers:{
//                         Authorization:localStorage.getItem("token")
//                     }
                    
//                 })
//                 console.log("userResponse",userResponse.data)
//                 dispatch({type:"LOGIN",payload:{account:userResponse.data}})
//                 navigate('/')
//             } catch(e){
//                 console.log(e)
//                 setServerErrors(e.response.data.errors)
//             }

//         }
//     })
//     return(
//         <div>
//             <h1>Login With Us</h1>
//             {serverErrors && <b>{serverErrors}</b>}
//             <form onSubmit={formik.handleSubmit}>
//                 <label>Enter Email</label>
//                 <input type="text"
//                 value={formik.values.email}
//                 name="email"
//                 onChange={formik.handleChange}/>
//                 {formik.errors.email}
//                 <br />

//                 <label>Enter Password</label>
//                 <input type="Password"
//                 value={formik.values.password}
//                 name="password"
//                 onChange={formik.handleChange}/>
//                 {formik.errors.password}
//                 <br />
//                 <input type="submit" />
//             </form>
//         </div>
//     )
// }

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../config/axios";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  styled,
  Container,
  Grid,
} from "@mui/material";

const loginValidation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(128),
});

const StyledContainer = styled(Container)`
  max-width: 10px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;

const StyledTypography = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 50%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 50%;
  margin-top: 20px;
`;

export default function Login({ loggedIn }) {
  const { dispatch, user } = useAuth();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/user/login", values);
        localStorage.setItem("token", response.data.token);
        loggedIn();

        const userResponse = await axios.get("/user/account", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("userResponse", userResponse.data);
        dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
        navigate("/");
      } catch (e) {
        console.log(e);
        setServerErrors(e.response.data.errors);
      }
    },
  });

  return (
    <StyledContainer>
      <StyledTypography variant="h1">Login With Us</StyledTypography>
      {serverErrors && <b>{serverErrors}</b>}
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item style={{ marginBottom: 4}}>
            <StyledTextField
              label="Enter Email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              error={formik.errors.email}
              helperText={formik.errors.email}
            />
          </Grid>
          <Grid item style={{ marginBottom: 4 }}>
            <StyledTextField
              label="Enter Password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
              helperText={formik.errors.password}
              type="password"
            />
          </Grid>
          <Grid item style={{ marginBottom: 4 }}>
            <StyledButton variant="contained" color="primary" type="submit">
              Login
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </StyledContainer>
  );
}