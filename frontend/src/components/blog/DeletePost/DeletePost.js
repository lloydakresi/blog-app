import { useDispatch } from "react-redux";
import { blogApi } from "../../../services/apiSlice";
import { useNavigate } from "react-router-dom";
import "./DeletePost.css";


export default function DeletePost({ blogId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const { isLoading } = await dispatch(blogApi.endpoints.deleteBlog.initiate(blogId)).unwrap();
            if (isLoading) {
                return <div>Loading...</div>;
            }

            alert('Blog deleted!');
            navigate('/blogs');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button className="deletePostButton" id={`deletePostButton-${blogId}`} onClick={handleDelete}>
            Delete Blog Post
        </button>
    );
}
