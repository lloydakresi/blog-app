//import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../../../services/apiSlice';
import DeletePost from '../DeletePost/DeletePost';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './FullBlog.css';

export default function FullBlog() {
    let { id } = useParams();
    id = parseInt(id, 10);
    const { data, isLoading, isError, refetch } = useGetBlogByIdQuery(id);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const sessionUser = useSelector((state) => state.session.user[0]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Oops! Something went wrong</div>;
    }

    const blog = data?.blog;
    const isOwner = sessionUser?.id === blog?.User?.id;

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="fullBlog" id={`fullBlog-${blog.id}`}>
            <h1 className="blogTitle">{blog.title}</h1>
            <div className="blogContent" key={blog.id}>
                <p>{blog.content}</p>
                <p className="authorInfo">by {blog.User?.username}</p>
            </div>
            {isOwner && (
                <Link to={`/blogs/${blog.id}/edit`} className="editPostLink">
                    <button className="editPostButton">Edit Post</button>
                </Link>
            )}
            {isOwner && <DeletePost blogId={blog.id} />}
        </div>
    );
}
