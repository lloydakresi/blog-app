import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { csrfFetch, restoreCSRF } from './store/csrf';
import SignupForm from './features/session/sessionComponents/SignUp/SignUp.js';
import LoginForm from './features/session/sessionComponents/Login/Login.js';
import BlogList from './components/blog/BlogList/BlogList.js';
import App from './App';
import FullBlog from './components/blog/FullBlog/FullBlog.js';
import CreateBlogForm from './components/blog/AddPost/AddPost.js';
import EditBlogForm  from './components/blog/EditBlog/EditPost.js';
import HomePage from './components/HomePage/HomePage.js';
import Profile from './features/session/sessionComponents/Profile/Profile.js';


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/:id" element={<FullBlog />}/>
          <Route path="blogs/new/" element={<CreateBlogForm />}/>
          <Route path="blogs/:blogId/edit" element={<EditBlogForm />}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
