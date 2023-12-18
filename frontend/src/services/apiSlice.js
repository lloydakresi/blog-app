import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { csrfFetch } from '../store/csrf';


const baseQuery =fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
})

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery,
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            queryFn: async () =>{
                try{
                    const res = await csrfFetch('api/blogs');
                    const data = await res.json();
                    return {data};
                }catch(err){
                    return {err};
                }
            },
            providesTags: ['Blog']
        }),
        getBlogById: builder.query({
            queryFn: async(id) => {
                try{
                    const res = await csrfFetch(`/api/blogs/${id}`);
                    const data = await res.json();
                    return {data};
                }catch(err){
                    return {err};
                }
            },
            providesTags: ['Blog']
        }),
        createBlog: builder.mutation({
            queryFn: ({title, content, imageUrls, userId}) => (
                csrfFetch('/api/blogs', {
                    method: 'POST',
                    body: JSON.stringify({title, content, imageUrls, userId})
                })
            ),
            invalidatesTags: ['Blog']
        }),
        updateBlog: builder.mutation({
            queryFn: async({blogId, userId, title, content, imageUrls}) =>{
                console.log(blogId, userId, title, content, imageUrls)
                const response = await csrfFetch(`/api/blogs/${blogId}`, {
                    method: 'PUT',
                    body: JSON.stringify({userId, title, content, imageUrls})
                })
                const blog = await response.json();
                //console.log('editpost', posts);
                return blog;
            },
            invalidatesTags: ['Blog']
        }),
        deleteBlog: builder.mutation({
            queryFn: async(id) =>{
                const blogId = id;
                const response = await csrfFetch(`/api/blogs/${blogId}`,
                 {
                    method: 'DELETE'
                })
                const blog = await response.json();
                return blog;
            },
            invalidatesTags: ['Blog']
        })
    })
})

export const { useGetAllBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;
