import { useEffect, useState } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth"; 

export default function Comment() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [myComments, setMyComments] = useState({});
    const [click, setClick] = useState(false);
    const [id, setId] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/posts");
                console.log("allpost", response.data);
                setPosts(response.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const handleToggle = async (postId) => {
        setClick(!click);
        setId(postId);
        setContent(""); 

        if (!myComments[postId]) {
            try {
                const commentResponse = await axios.get(`/api/posts/${id}/comments`);
                setMyComments((prevComments) => ({
                    ...prevComments,
                    [postId]: commentResponse.data,
                }));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            content: content,
        };
        try {
            const response = await axios.post(`/api/posts/${id}/comments`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            const newComment = response.data;

            setMyComments((prevComments) => ({
                ...prevComments,
                [id]: [newComment, ...(prevComments[id] || [])],
            }));

            setContent(""); 
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit = async (commentId, postId) => {
        try {
            const response = await axios.put(`/api/posts/${id}/comments/${id}`, { content: editContent }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            setMyComments((prevComments) => ({
                ...prevComments,
                [postId]: prevComments[postId].map((comment) => {
                    if (comment._id === commentId) {
                        return { ...comment, content: editContent };
                    }
                    return comment;
                }),
            }));
            setEditMode(false);
            setEditCommentId(null);
            setEditContent("");
        } catch (error) {
            console.log("Error editing comment:", error);
        }
    };

    const handleDelete = async (commentId, postId) => {
        try {
            const response = await axios.delete(`/api/posts/${id}/comments/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setMyComments((prevComments) => ({
                ...prevComments,
                [postId]: prevComments[postId].filter((comment) => comment._id !== commentId),
            }));
        } catch (error) {
            console.log("Error deleting comment:", error);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>All Posts</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map((ele) => (
                    <li key={ele._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px', position: 'relative' }}>
                        <Link to={`/api/posts/showOne/${ele._id}`} style={{ color: '#333', textDecoration: 'none' }}>
                            <h2 style={{ marginBottom: '10px' }}>{ele.title}</h2>
                        </Link>
                        <p style={{ marginBottom: '10px' }}>{ele.content}</p>
                        {myComments[ele._id] && (
                            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                                {myComments[ele._id].map((comment) => (
                                    <li key={comment._id} style={{ marginTop: '10px', padding: '10px', borderTop: '1px solid #ddd', position: 'relative' }}>
                                        {editMode && editCommentId === comment._id ? (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <button onClick={() => handleEdit(comment._id, ele._id)}>Save</button>
                                                <button onClick={() => { setEditMode(false); setEditContent(""); }}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <span>{comment.content}</span>
                                                <div style={{ marginLeft: 'auto' }}>
                                                    <button onClick={() => { setEditMode(true); setEditCommentId(comment._id); setEditContent(comment.content); }}>Edit</button>
                                                    <button onClick={() => handleDelete(comment._id, ele._id)}>Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button onClick={() => handleToggle(ele._id)} style={{ marginTop: '20px', position: 'absolute', bottom: '10px', left: '10px' }}>
                            {click && id === ele._id ? 'Cancel' : 'Comment'}
                        </button>
                        {click && id === ele._id && (
                            <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                                <input
                                    type="text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write a comment"
                                    style={{ width: 'calc(100% - 90px)', padding: '8px', margin: '10px 0', boxSizing: 'border-box' }}
                                />
                                <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', marginLeft: '10px' }}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}