import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title:'',
    content: '',
    imageUrl:[],
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers:{
        setTitle(state, action){
            state.title = action.payload
        },
        setContent(state, action){
            state.content = action.payload
        },
        setImageUrl(state, action){
            state.imageUrl = action.payload
        },
        /*resetBlog(state){
            state.title = ''
            state.content = ''
            state.imageUrl = []
        }*/
    }
})

export const { setTitle, setContent, setImageUrl, resetBlog } = blogSlice.actions
export default blogSlice.reducer
