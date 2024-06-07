

// import React, { useState } from "react";
// import axios from "../config/axios";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useNavigate } from "react-router-dom";

// export default function PostForm() {
//     const [postForm, setPostForm] = useState({
//         title: '',
//         content: '',
//         postImage: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPostForm({ ...postForm, [name]: value });
//     };

//     const handleContentChange = (value) => {
//         setPostForm({ ...postForm, content: value });
//     };

//     const handleFileChange = (e) => {
//         const file= e.target.files[0];
//         setPostForm({ ...postForm, postImage: file });
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       // Check if title and content are not empty
//       if (!postForm.title.trim()) {
//           alert('Title is required');
//           return;
//       }
//       if (!postForm.content.trim()) {
//           alert('Content is required');
//           return;
//       }
//       // Existing check for postImage
//       if (!postForm.postImage) {
//           alert('Please select a postImage image');
//           return;
//       }
  
//       const formData = new FormData();
//       formData.append('title', postForm.title);
//       formData.append('content', postForm.content);
//       formData.append('postImage', postForm.postImage);
//       console.log(formData)
  
//       try {
//           const response = await axios.post('/api/posts', formData, {
//               headers: {
//                   Authorization: localStorage.getItem('token'),
//                   //'Content-Type': 'multipart/form-data'
//               }
//           });
//           console.log(formData)
//           console.log(response.data);
//           // setPostForm({
//           //     title: '',
//           //     content: '',
//           //     postImage: ''
//           // });
//           alert('Post is created');
//           navigate('/allBlogs');
//       } catch (error) {
//           console.log(error);
//           alert('Failed to create post');
//       }
//   };

//     return (
//         <div>
//             <h2>Create New Post</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="title">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={postForm.title}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="content">Content</label>
//                     <ReactQuill
//                         value={postForm.content}
//                         onChange={handleContentChange}
//                         theme="snow"
//                     />
//                 </div>

//                 <div>
//                 <label htmlFor="postImage" >Choose a file:</label>
//                     <input
//                         type="file"
//                         id="postImage"
//                         name="postImage"
//                         //value={postForm.postImage}
//                         onChange={handleFileChange}/>
//                 </div>

//                 <button type="submit">Post</button>
//             </form>
//         </div>
//     );
// }


import {useState} from "react"
import axios from "../config/axios"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom'

export default function AddBlogs(){
  const navigate=useNavigate()
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [postImage,setPostImage]=useState('')
  const [serverErrors,setServerErrors]=useState(null)
  const [clientErrors,setClientErrors]=useState({})

  const errors={}

  const runValidations = () => {
      
      if(title.trim().length === 0) {
          errors.title = 'title is required'
      }

      if(content.trim().length === 0) {
          errors.content = 'content is required'
      }

      if(postImage.trim().length === 0) {
          errors.img = 'postImage is required'
      }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = {
          title:title,
          content:content,
          postImage:postImage
      }

      
      runValidations()

      if(Object.keys(errors).length === 0) {
          try {
              const response = await axios.post('/api/posts', formData,
              {
                  headers:{
                      Authorization:localStorage.getItem('token')
                  }
              }
              ) 
              navigate('/allblogs')
          } catch(err) {
              console.log(err.response.data)
              setServerErrors(err.response.data)
          }
      } else {
          setClientErrors(errors)
      }
  }
  
  return (
      <div>
          <h1>AddBlogs</h1>

          <form onSubmit={handleSubmit}>
          <label htmlFor="title">Enter Title</label><br/>
          <input type="text"
          value={title}
          id="title"
          onChange={e=>{setTitle(e.target.value)}}
          />
          <br/>
          <label htmlFor="content">Enter Content</label><br/>
          <ReactQuill 
          type='text'
          theme="snow"
          id="content"
           value={content} 
           onChange={setContent} />
           <br/>
           <label htmlFor="img">Add images</label><br/>
          <input type="file"
          value={postImage}
          id="postImage"
          onChange={e=>{setPostImage(e.target.value)}}
          />
           <br/>
           <input type="submit"/>
           </form>

      </div>
  )
}
