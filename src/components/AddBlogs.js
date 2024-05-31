// import { useState } from "react"
// import axios from "../config/axios"
// import { useNavigate } from "react-router-dom";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// export default function AddBlogs(){

//     const navigate=useNavigate()
//     const [form, setForm] = useState({
//         content: "",
//         title: "",
//         pic: ""
//       });
//     const [serverErrors,setServerErrors]=useState(null)
//     const [clientErrors,setClientErrors]=useState({})

//     const errors={}

//     // const runValidations = () => {
        
//     //     if(title.trim().length === 0) {
//     //         errors.title = 'title is required'
//     //     }

//     //     if(content.trim().length === 0) {
//     //         errors.content = 'content is required'
//     //     }

//     //     if(img.trim().length === 0) {
//     //         errors.img = 'img is required'
//     //     }
//     // }

//     const validationSchema = yup.object({
//         title: yup.string().required("Title is required"),
//         content: yup.string().required("Content is required"),
//         pic: yup.string().required("Pic URL is required")
//       });

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const formData = {
//             title:title,
//             content:content,
//             img:img
//         }

//         runValidations()

//         if(Object.keys(errors).length === 0) {
//             try {
//                 const response = await axios.post('/api/posts', formData,
//                 {
//                     headers:{
//                         Authorization:localStorage.getItem('token')
//                     }
//                 }
//                 ) 
//                 navigate('/allblogs')
//             } catch(err) {
//                 console.log(err.response.data)
//                 setServerErrors(err.response.data)
//             }
//         } else {
//             setClientErrors(errors)
//         }
//     }

//     const handleFileChange = (e) => {
//         const file= e.target.files[0];
//         setForm({ ...form, img: file });
//     };

//     return(
//         <div>
//             <h1>Create Your Blogs</h1>
//             <form encType="multipart/form-data" onSubmit={handleSubmit}>
            
//             <label htmlFor="title">Enter Title</label><br/>
//             <input type="text"
//             value={title}
//             id="title"
//             onChange={e=>{setTitle(e.target.value)}}
//             />
//             <br/>
//             <br />
//             <label htmlFor="content">Enter Content</label><br/>
//             <ReactQuill 
//             type='text'
//             theme="snow"
//             id="content"
//              value={content} 
//              onChange={setContent} />
//              <br/>
//              <br />
//              <label htmlFor="img">Add images</label><br/>
//              <label>Update Profile</label>
//                 <input
//                     type="file"
                    
//                     name="file"
//                     onChange={handleFileChange}
//                     // style={inputStyle}
//                 />
//              <br/>
//              <br />
//              <input type="submit"/>

//             </form>
//         </div>
//     )
// }

import { useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';

export default function AddBlogs(){

    const navigate = useNavigate();
    const [form, setForm] = useState({
        content: "",
        title: "",
        pic: ""
    });
    const [serverErrors, setServerErrors] = useState(null);
    const [clientErrors, setClientErrors] = useState({});

    const validationSchema = yup.object({
        title: yup.string().required("Title is required"),
        content: yup.string().required("Content is required"),
        pic: yup.string().required("Pic URL is required")
    });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await validationSchema.validate(form, { abortEarly: false });
    //         try {
    //             const formData = new FormData();
    //             formData.append('title', form.title);
    //             formData.append('content', form.content);
    //             formData.append('img', form.pic);
    //             const response = await axios.post('/api/posts', formData, {
    //                 headers:{
    //                     Authorization:localStorage.getItem('token')
    //                 }
    //             });
    //             navigate('/allblogs');
    //         } catch(err) {
    //             console.log(err.response.data);
    //             setServerErrors(err.response.data);
    //         }
    //     } catch(err) {
    //         setClientErrors(err.inner.reduce((acc, curr) => ({...acc, [curr.path]: curr.message }), {}));
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(form, { abortEarly: false });
            try {
                const formData = new FormData();
                formData.append('title', form.title);
                formData.append('content', form.content);
                formData.append('img', form.pic, form.pic.name); // Send the file with its original name
                console.log(formData)
                const response = await axios.post('/api/posts', formData, {
                    headers:{
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                        Authorization: localStorage.getItem('token')
                    }
                    
                });
                console.log(response.data)
                navigate('/allblogs');
            } catch(err) {
                console.log(err.response.data);
                setServerErrors(err.response.data);
            }
        } catch(err) {
            setClientErrors(err.inner.reduce((acc, curr) => ({...acc, [curr.path]: curr.message }), {}));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({...form, pic: file });
    };

    const handleTitleChange = (e) => {
        setForm({...form, title: e.target.value });
    };

    const handleContentChange = (content) => {
        setForm({...form, content });
    };

    return(
        <div>
            <h1>Create Your Blogs</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
            
            <label htmlFor="title">Enter Title</label><br/>
            <input type="text"
            value={form.title}
            id="title"
            onChange={handleTitleChange}
            />
            {/* {clientErrors.title && <div style={{ color: 'ed' }}>{clientErrors.title}</div>} */}
            <br/>
            <br />
            
            <label htmlFor="content">Enter Content</label><br/>
            <ReactQuill 
            theme="snow"
            id="content"
            value={form.content} 
            onChange={handleContentChange} />
            {/* {clientErrors.content && <div style={{ color: 'ed' }}>{clientErrors.content}</div>} */}
            <br/>
            <br />
            <label htmlFor="img">Add images</label><br/>
            <label>Update Profile</label>
                <input
                    type="file"
                    
                    name="file"
                    onChange={handleFileChange}
                    // style={inputStyle}
                />
            {/* {clientErrors.pic && <div style={{ color: 'ed' }}>{clientErrors.pic}</div>} */}
            <br/>
            <br />
            <input type="submit"/>

            </form>
        </div>
    )
}