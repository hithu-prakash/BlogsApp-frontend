import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useParams } from "react-router-dom";

export default function AllBlogs() {
    const navigate = useNavigate();
    const {postId} = useParams()
    const [blogs, setBlogs] = useState([]);
    const [comment, setComment] = useState("");
    const [commentId, setCommentId] = useState("");
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/posts');
                setBlogs(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBlogs();
    }, []);

    // const handleToggle = (id) => {
    //     setCommentId(commentId === id ? "" : id);
    // };

    // const handleSubmit=async(e)=>{
    //      e.preventDefault()
    //      try{
    //       const response = await axios.put(`/api/posts/${postId}/comments/${commentId}`,{
    //     headers:{
    //         Authorization:localStorage.getItem('token')
    //     }
    // })
    //         console.log(response.data)
    //         setComment(response.data)
    //     } catch(err){
    //          console.log(err.message)
    //      }
    // }
    
    


    return (
        <div>
            <h1>All Blogs</h1>

            {blogs && blogs.map((blog) => (
                <div key={blog._id}>
                    {/* <img src={URL.createObjectURL(blog.photoData)} alt={blog.title} /> */}

                    <h4>{blog.title}</h4>
                    <img src={blog.images} alt={blog.title} />
                    
                    <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    <button onClick={() => navigate(`/singlepost/${blog._id}`)}>View</button>

                    {/* <button onClick={() => handleToggle(blog._id)}>{commentId === blog._id ? 'Cancel' : 'Comment'}</button>
                     */}
                    {commentId === blog._id && (
                        <form>
                            <textarea value={comment}  onChange={(e) => setComment(e.target.value)} /><br/>
                            <input type="submit"/>

                            
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
    }
