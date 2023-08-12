import {createAsyncThunk, createSlice,  } from '@reduxjs/toolkit';

// const INITIAL_STATE  = {
//   user: null,
// };

// const userReducer = (state = INITIAL_STATE, action) => {
//   switch(action.type) {
//     default:
//       return state;
//   }
// }


export const userSlice = createSlice({
  name: "user",
  initialState : {
    user: null,
  },

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    logout: (state) => {
      state.user = null;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const { login, logout } = userSlice.actions;

//selector 
export const selectUser = (state) => state.user.user;

// export const selectLoading = (state) => state.articleState.loading 

export default userSlice.reducer;
