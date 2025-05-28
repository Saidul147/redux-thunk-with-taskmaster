import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase.config';

const initialState = {
  name: '',
  email: '',
  password:"",
  isLoading:true,
  isError:false,
  error:"",
};

export const createUser =createAsyncThunk(
  'userSlice/createUser',
  async ({name,email,password}) => {
   const data = await createUserWithEmailAndPassword(auth,email, password)
   const user = data?.user
  //  const profile = await updateProfile(user,{
  //   displayName:name,
  //  })



   console.log(user,"from thunk")
    return {
      name: user?.displayName, // now will return the name you just set
      email: user?.email,
      // password:data?.password
    }
  }
)

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(createUser.pending,(state,action) => {
      state.name = ""
      state.email = ""
      state.isLoading = true,
      state.isError = false,
      state.error = ""
    })
    .addCase(createUser.fulfilled,(state,action) => {
      state.name = action?.payload?.name
      state.email = action?.payload?.email
      state.isLoading = false
      state.isError = false
      state.error = ""
    })
    .addCase(createUser.rejected,(state,action) => {
      state.name = "",
      state.email = "",
      state.isLoading = false,
      state.isError = true,
      state.error = action?.error?.message
    })
  }
});

export default userSlice.reducer;
