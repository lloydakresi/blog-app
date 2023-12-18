import { useGetAllBlogsQuery } from "../../services/apiSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function BlogList(){
    const { data, isLoading, refetch } = useGetAllBlogsQuery();
    const blogs = data?.blogs

    useEffect(()=>{
        refetch();
    }, [refetch])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Blog List</h1>
             <Link to='/blogs/new'>Create New Post</Link>
                {blogs.map(post => (
                    <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>by {post.User?.username}</p>
                    <Link to={`/blogs/${post.id}`}>View Post</Link>
                    </div>
                ))}
        </div>
    )
}
