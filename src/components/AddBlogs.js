// import { useState } from "react";
// import axios from "../config/axios";
// import { useNavigate } from "react-router-dom";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


// export default function AddBlogs(){

//     const navigate = useNavigate();
//     const errors = {}

//     const [form, setForm] = useState({
//         content: "",
//         title: "",
//         postImage: null
//     });
//     const [serverErrors, setServerErrors] = useState(null);
//     const [clientErrors, setClientErrors] = useState({});

   

//     const validations = () => {
//         if (form.title.trim().length === 0) {
//             errors.title = 'Title is required'
//         }

//         if (form.content.trim().length === 0) {
//             errors.content = 'Content is required'
//         }
//         else if (form.content.trim().length < 200) {
//             errors.content = 'Content should be minimum 200 character'
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
         
//         const formData = new FormData()
//         formData.append('title', form.title)
//         formData.append('content', form.content)
//         if (form.postImage) {
//             formData.append('postImage', form.postImage)
//         }
    
//         // Log the size of the formData
//         console.log("FormData size:", formData.size);
    
//         validations()
    
//         if (Object.keys(errors).length === 0) {
//             try {
//                 const response = await axios.post('/api/posts', formData, {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 })
//                 navigate('/allblogs')
//             } catch (err) {
//                 console.log(err)
//                 setServerErrors(err.response.data.errors[0].msg)
//             }
//         } else {
//             setClientErrors(errors)
//         }
//     }
    
   
//     return(
//         <div>
//             <h1>Create Your Blogs</h1>
//             <form encType="multipart/form-data" onSubmit={handleSubmit}>
//             <div>
//             <label htmlFor="title">Enter Title</label><br/>
//             <input type="text"
//             value={form.title}
//             id="title"
//             onChange={(e) => {
//                 setForm({ ...form, title: e.target.value })
//             }}
//             />
//             {clientErrors.title && <div style={{ color: 'ed' }}>{clientErrors.title}</div>}
//             <br/>
//             <br />
            
//             <label htmlFor="content">Enter Content</label><br/>
//             <ReactQuill 
//             theme="snow"
//             id="content"
//             value={form.content} 
//             onChange={(value) => {
//                 setForm({ ...form, content: value })
//             }} />
//              {clientErrors.content && <div style={{ color: 'ed' }}>{clientErrors.content}</div>} 
//             <br/>
//             </div>
//             <br />
//             <label htmlFor="postImage">Add Posts</label><br/>
//             <label>Upload images</label>
//                 <input
//                     type="file"
//                     name="postImage"
                    
//                     onChange={(e) => {
//                         setForm({ ...form, postImage: e.target.files[0] })
//                     }}
//                     // style={inputStyle}
//                 />
//             {clientErrors.postImage && <div style={{ color: 'ed' }}>{clientErrors.postImage}</div>} 
//             <br/>
//             <br />
//             <input type="submit"/>

//             </form>
//         </div>
//     )
// }

import React, { useState } from "react";
import axios from "../config/axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

export default function PostForm() {
    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        postImage: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostForm({ ...postForm, [name]: value });
    };

    const handleContentChange = (value) => {
        setPostForm({ ...postForm, content: value });
    };

    const handleFileChange = (e) => {
        const file= e.target.files[0];
        setPostForm({ ...postForm, postImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!postForm.postImage) {
          alert('Please select a postImage image');
          return;
        }
        const formData = new FormData();
        formData.append('title', postForm.title);
        formData.append('content', postForm.content);
        formData.append('postImage', postForm.postImage);
      
        try {
          const response = await axios.post('/api/posts', formData, {
            headers: {
              Authorization: localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data);
          setPostForm({
            title: '',
            content: '',
            postImage: ''
          });
          alert('Post is created')
          navigate('/allBlogs');
        } catch (error) {
          console.log(error);
          alert('Failed to create post');
        }
      };

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={postForm.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <ReactQuill
                        value={postForm.content}
                        onChange={handleContentChange}
                        theme="snow"
                    />
                </div>

                <div>
                <label htmlFor="postImage" >Choose a file:</label>
                    <input
                        type="file"
                        id="postImage"
                        name="postImage"
                        onChange={handleFileChange}/>
                </div>

                <button type="submit">Post</button>
            </form>
        </div>
    );
}
