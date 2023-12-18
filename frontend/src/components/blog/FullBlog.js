//import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../../services/apiSlice';
import DeletePost from './DeletePost';
import { useSelector } from 'react-redux';



export default function FullBlog() {
  let { id } = useParams();
  id = parseInt(id, 10);
  const { data, isLoading, isError } = useGetBlogByIdQuery(id);
  const blog = data?.blog;
  const sessionUser = useSelector(state => state.session.user[0]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Oops! Something went wrong</div>
  }

  if (!blog) {
        return <div>Blog not found</div>
    }

    const isOwner = sessionUser?.id === blog?.User?.id;

  return (
    <div>
      <h1>{blog.title}</h1>
      <div key={blog.id}>
        <p>{blog.content}</p>
        <p>by {blog.User?.username}</p>
      </div>
      {isOwner && <Link to={`/blogs/${blog.id}/edit`}><button>Edit Post</button></Link>}
      {isOwner && <DeletePost blogId={blog.id} />}
    </div>
  );
}
