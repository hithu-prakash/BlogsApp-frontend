// import axios from "../config/axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register({ registerIn }) {
//     const navigate = useNavigate();
//     //const [details,setDetails]=useState()

//     const [form, setForm] = useState({
//         username: "",
//         email: "",
//         password: "",
//         profilePic: null,
//         bio: "",
        
//         serverErrors: null,
//         clientErrors: {}
//     });

//     const runValidations = () => {
//         const errors = {};

//         if (form.username.trim().length === 0) {
//             errors.username = 'Username is required';
//         }

//         if (form.email.trim().length === 0) {
//             errors.email = 'Email is required';
//         } 
//         // Uncomment if you want to use the validator library for email validation
//         // else if (!validator.isEmail(form.email)) {
//         //     errors.email = 'Invalid email format';
//         // }

//         if (form.password.trim().length === 0) {
//             errors.password = 'Password is required';
//         } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
//             errors.password = 'Password must be between 8 and 128 characters';
//         }

//         return errors;
//     };

//     const displayErrors = () => {
//         let result;
//         if (typeof form.serverErrors === 'string') {
//             result = <p>{form.serverErrors}</p>;
//         } else {
//             result = (
//                 <div>
//                     <h3>These errors prohibited the form from being saved:</h3>
//                     <ul>
//                         {form.serverErrors.map((ele, i) => (
//                             <li key={i}>{ele.msg}</li>
//                         ))}
//                     </ul>
//                 </div>
//             );
//         }
//         return result;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const errors = runValidations();

//         if (Object.keys(errors).length === 0) {
//             const formData = new FormData();
//             formData.append('username', form.username);
//             formData.append('email', form.email);
//             formData.append('password', form.password);
//             formData.append('bio', form.bio);
//             formData.append('profilePic', form.profilePic);
        

//             try {
//                 const response = await axios.post("/user/register", formData ,{
//                     headers:{
//                         'Content-Type': 'multipart/form-data',
//                     }
//                 });
//                 console.log(response.data);

                
//                 registerIn();
//                 navigate("/login");
//             } catch (e) {
//                 setForm({ ...form, serverErrors: e.response.data.errors, clientErrors: {} });
//             }
//         } else {
//             setForm({ ...form, clientErrors: errors });
//         }
//     };

//     const handleFileChange = (e) => {
//         const file= e.target.files[0];
//         setForm({ ...form, profilePic: file });
//     };

//     return (
//         <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
//             <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Here</h1>

//             {form.serverErrors && displayErrors()}
//             <form encType="multipart/form-data" onSubmit={handleSubmit}>
//                 <label style={labelStyle} htmlFor="username">Enter Username</label>
//                 <input
//                     type="text"
//                     onChange={e => setForm({ ...form, username: e.target.value })}
//                     id="username"
//                     value={form.username}
//                     style={inputStyle}
//                 />
//                 {form.clientErrors.username && <span>{form.clientErrors.username}</span>}
//                 <br />
//                 <label style={labelStyle} htmlFor="email">Enter Email</label>
//                 <input
//                     type="text"
//                     onChange={e => setForm({ ...form, email: e.target.value })}
//                     id="email"
//                     value={form.email}
//                     style={inputStyle}
//                 />
//                 {form.clientErrors.email && <span>{form.clientErrors.email}</span>}
//                 <br />
//                 <label style={labelStyle} htmlFor="password">Enter Password</label>
//                 <input
//                     type="password" // Use type password for security
//                     onChange={e => setForm({ ...form, password: e.target.value })}
//                     value={form.password}
//                     id="password"
//                     style={inputStyle}
//                 />
//                 {form.clientErrors.password && <span>{form.clientErrors.password}</span>}
//                 <br />
//                 <label style={labelStyle} htmlFor="bio">Bio</label>
//                 <textarea
//                     onChange={e => setForm({ ...form, bio: e.target.value })}
//                     value={form.bio}
//                     id="bio"
//                     style={inputStyle}
//                 />
//                 {form.clientErrors.bio && <span>{form.clientErrors.bio}</span>}
//                 <br />
//                 <label style={labelStyle}>Update Profile</label>
//                 <input
//                     type="file"
//                     name="file"
//                     onChange={handleFileChange}
//                     style={inputStyle}
//                 />
//                 <br />
//                 <input
//                     type="submit"
//                     style={{
//                         padding: '10px',
//                         backgroundColor: '#323ca8',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                     }}
//                 />
//             </form>
//         </div>
//     );
// }

// const labelStyle = {
//     display: 'block',
//     marginBottom: '5px',
//     fontWeight: 'bold',
// };

// const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     margin: '5px 0',
//     boxSizing: 'border-box',
// };

import axios from "../config/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";

export default function Register({ registerIn }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: null,
    bio: "",
    serverErrors: null,
    clientErrors: {}
  });

  const runValidations = () => {
    const errors = {};

    if (form.username.trim().length === 0) {
      errors.username = 'Username is required';
    }

    if (form.email.trim().length === 0) {
      errors.email = 'Email is required';
    } 

    if (form.password.trim().length === 0) {
      errors.password = 'Password is required';
    } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
      errors.password = 'Password must be between 8 and 128 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = runValidations();

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('bio', form.bio);
      formData.append('profilePic', form.profilePic);
        
      try {
        const response = await axios.post("/user/register", formData,{
          headers:{
            'Content-Type': 'ultipart/form-data',
          }
        });
        console.log(response.data);

        registerIn();
        navigate("/login");
      } catch (e) {
        setForm({...form, serverErrors: e.response.data.errors, clientErrors: {} });
      }
    } else {
      setForm({...form, clientErrors: errors });
    }
  };

  const handleFileChange = (e) => {
    const file= e.target.files[0];
    setForm({...form, profilePic: file });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 2, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register Here
      </Typography>

      {form.serverErrors && (
        <Typography variant="body1" color="error" align="center" gutterBottom>
          {form.serverErrors}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Username"
          margin="normal"
          value={form.username}
          onChange={e => setForm({...form, username: e.target.value })}
          error={Boolean(form.clientErrors.username)}
          helperText={form.clientErrors.username}
          fullWidth
        />
        <br />
        
        <TextField
          label="Enter Email"
          margin="normal"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value })}
          error={Boolean(form.clientErrors.email)}
          helperText={form.clientErrors.email}
          fullWidth
        />
        <br />
        
        <TextField
          type="password"
          label="Enter Password"
          margin="normal"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value })}
          error={Boolean(form.clientErrors.password)}
          helperText={form.clientErrors.password}
          fullWidth
        /><br />
        
        <TextField
          label="Bio"
          margin="normal"
          value={form.bio}
          onChange={e => setForm({...form, bio: e.target.value })}
          error={Boolean(form.clientErrors.bio)}
          helperText={form.clientErrors.bio}
          fullWidth
        />
        <br />
        
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          style={{ marginBottom: '5px' }}
        />
        <br />
        
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Container>
  );
}