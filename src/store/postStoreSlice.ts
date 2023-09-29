import { createSlice } from "@reduxjs/toolkit";
import { IpostData } from "../constants/types";

interface CounterState {
  posts: IpostData[];
}

// Define the initial state using that type

const initialState: CounterState = {
  posts: [],
};

export const PostStoreSlice = createSlice({
  name: "postStore",
  initialState,

  reducers: {
    fetchData: (state, actions) => {
      state.posts = actions.payload;
    },
  },
});
export const { fetchData } = PostStoreSlice.actions;
export default PostStoreSlice.reducer;
