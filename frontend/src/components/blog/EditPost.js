import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { blogApi, useGetBlogByIdQuery } from '../../services/apiSlice';

const EditBlogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  let { blogId } = useParams();
  blogId = parseInt(blogId, 10);
  const { data, isLoading, isError } = useGetBlogByIdQuery(blogId);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrls: [],
  });

  useEffect(() => {
    const blog = data?.blog;
    console.log(blog);

    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        imageUrls: blog.imageUrls ? [...blog.imageUrls] : [],
      });
    }
  }, [blogId, data?.blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedImageUrls = [...prevFormData.imageUrls];
      updatedImageUrls[index] = value;
      return {
        ...prevFormData,
        imageUrls: updatedImageUrls,
      };
    });
  };

  const handleAddImageUrl = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: [...prevFormData.imageUrls, ''],
    }));
  };

  const handleRemoveImageUrl = (index) => {
    setFormData((prevFormData) => {
      const updatedImageUrls = [...prevFormData.imageUrls];
      updatedImageUrls.splice(index, 1);
      return {
        ...prevFormData,
        imageUrls: updatedImageUrls,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the editBlog action and wait for it to complete
      const { title, content, imageUrls } = formData;
      await dispatch(
        blogApi.endpoints.updateBlog.initiate({
            title,
            content,
            imageUrls,
            blogId,
            userId: session.user[0]?.id
        })
      ).unwrap();

      // After the state has been updated, navigate to the post
        alert('Blog post updated successfully!');
        navigate(`/blogs`);


    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Blog List</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Blog List</h1>
        <h2>Failed to load posts</h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="imageUrls">Image URLs:</label>
        {formData.imageUrls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleImageUrlChange(e, index)}
              required
            />
            <button type="button" onClick={() => handleRemoveImageUrl(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddImageUrl}>
          Add Image
        </button>
      </div>

      <button type="submit">Update Blog Post</button>
    </form>
  );
};

export default EditBlogForm;
