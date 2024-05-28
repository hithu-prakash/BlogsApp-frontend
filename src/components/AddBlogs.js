import { useState } from "react"
import axios from "../config/axios"
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function AddBlogs(){

    const navigate=useNavigate()
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [img,setImg]=useState('')
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

        if(img.trim().length === 0) {
            errors.img = 'img is required'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title:title,
            content:content,
            img:img
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

    return(
        <div>
            <h1>Create Your Blogs</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter Title</label><br/>
            <input type="text"
            value={title}
            id="title"
            onChange={e=>{setTitle(e.target.value)}}
            />
            <br/>
            <br />
            <label htmlFor="content">Enter Content</label><br/>
            <ReactQuill 
            type='text'
            theme="snow"
            id="content"
             value={content} 
             onChange={setContent} />
             <br/>
             <br />
             <label htmlFor="img">Add images</label><br/>
            <input type="text"
            value={img}
            id="img"
            onChange={e=>{setImg(e.target.value)}}
            />
             <br/>
             <br />
             <input type="submit"/>

            </form>
        </div>
    )
}