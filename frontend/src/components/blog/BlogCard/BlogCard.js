import './BlogCard.css';
import { Link } from 'react-router-dom';

const calculateReadingTime = (text) => {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 120;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
};

const BlogCard = ({ blog }) => {
    const readingTime = calculateReadingTime(blog.content);

    return (
        <div className="blogCard" id={`blogCard-${blog.id}`}>
            <h2 className="blogTitle">{blog.title}</h2>
            <p className="blogContent">{blog.content.substring(0, 50)}</p>
            <p className="blogAuthor">by {blog.User?.username}</p>
            <p className="blogReadingTime">Reading Time: {readingTime} min</p>
            <Link to={`/blogs/${blog.id}`} className="viewPostLink">
                View Post
            </Link>
        </div>
    );
};

export default BlogCard;
