import { useGetAllBlogsQuery } from "../../../services/apiSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../BlogCard/BlogCard";
import "./BlogList.css";


export default function BlogList() {
    const { data, isLoading, refetch } = useGetAllBlogsQuery();
    const blogs = data?.blogs;
    const sessionUser = useSelector((state) => state.session);
    let finalUser;
    const status = useSelector((state) => state.session.status);

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading || status !== 'succeeded') {
        return <div>Loading...</div>;
    }

    finalUser = sessionUser.user[0];
    const isAuthenticated = finalUser !== undefined;

    return (
        <div className="blogListComponent">
            <div className="blog_list_header">
                <h1>Blog List</h1>
                {isAuthenticated && <Link to="/blogs/new">Create New Post</Link>}
            </div>
            <div className="blog_list">
                {blogs.map((post) => (
                    <BlogCard key={post.id} blog={post} />
                ))}
            </div>
        </div>
    );
}
