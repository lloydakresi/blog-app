import { useDispatch } from "react-redux";
import { blogApi } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";


export default function DeletePost({ blogId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleDelete = async () => {
        try{
            await dispatch(blogApi.endpoints.deleteBlog.initiate(blogId)).unwrap();
            alert('Blog deleted!');
            navigate('/blogs');
        }catch(err){
            console.log(err);
        }
    }

    return (
       <button onClick={handleDelete}>
        Delete Blog Post
        </button>
    )
}
