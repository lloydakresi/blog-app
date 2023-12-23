

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../../services/apiSlice';
import './AddPost.css'; // Import the CSS file

const CreateBlogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  const status = useSelector((state) => state.session.status);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrls: [],
  });

  if (status === 'loading' || session.status === 'loading') {
    return (
      <div>
        <h1>Create Blog</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (status === 'failed' || session.status === 'failed') {
    return (
      <div>
        <h1>Create Blog</h1>
        <h2>Oops! Something went wrong</h2>
      </div>
    );
  }

  const userId = session.user[0]?.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls[index] = value;
    setFormData({
      ...formData,
      imageUrls: updatedImageUrls,
    });
  };

  const handleAddImageUrl = () => {
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, ''],
    });
  };

  const handleRemoveImageUrl = (index) => {
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls.splice(index, 1);
    setFormData({
      ...formData,
      imageUrls: updatedImageUrls,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any image URL is empty before submitting
    if (formData.imageUrls.some((url) => url.trim() === '')) {
      alert('Please provide a valid image URL for all fields.');
    }

    // Dispatch action to create a new blog post
    const { isLoading, isSuccess } = dispatch(
      blogApi.endpoints.createBlog.initiate({
        title: formData.title,
        content: formData.content,
        imageUrls: formData.imageUrls,
        userId,
      })
    );

    if (isLoading) {
      alert('Creating blog post...');
    }

    if (isSuccess) {
      navigate(`/blogs`);
    }

    // Reset the form after submission
    setFormData({
      title: '',
      content: '',
      imageUrls: [],
    });
    alert('Blog post created successfully!');
    navigate(`/blogs`);
  };

  return (
    <form className="create-blog-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="textarea-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrls">Image URLs (separated by commas):</label>
        {formData.imageUrls.map((url, index) => (
          <div className="image-url-group" key={index}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleImageUrlChange(e, index)}
              required
              className="input-field"
            />
            <button
              type="button"
              onClick={() => handleRemoveImageUrl(index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddImageUrl} className="add-image-button">
          Add Image
        </button>
      </div>

      <button type="submit" className="submit-button">
        Create Blog Post
      </button>
    </form>
  );
};

export default CreateBlogForm;
