import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../utils/firebase.config';

const initialState = {
  name: '',
  email: '',
  isLoading:true,
  isError:false,
  error:"",
};

export const createUser =createAsyncThunk(
  'userSlice/createUser',
  async ({name,email,password}) => {
   const data = await createUserWithEmailAndPassword(auth,email, password)
    await updateProfile(auth.currentUser,{
    displayName:name,
   })
//to set a user Name for a new user you have to call updateProfile and pass, auth.currentUser and then set the name on displayName property.
//no need to save the password. password will automatic set with the user and it is encrypted.

    return {
      name: data?.user?.displayName, // now will return the name you just set
      email: data?.user?.email
    }
  }
)

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async ({email,password}) => {
    const data = await signInWithEmailAndPassword(auth,email,password)
    console.log(data,"from loginUSer")
    return {
      name:data?.user?.displayName,
      email:data?.user?.email
    }
  }
)


const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logOut:(state) => {
      signOut(auth);
      state.name = '';
      state.email = '';
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    }
  },
  extraReducers:(builder) => {
    //for Create new User
    builder
    .addCase(createUser.pending,(state,action) => {
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
    //for Existing user:
    .addCase(loginUser.pending,(state,action) => {
      state.name = "",
      state.email = "",
      state.isLoading =true,
      state.isError = false,
      state.error = ""
    })
    .addCase(loginUser.fulfilled,(state,action) => {
      state.name =action?.payload?.name,
      state.email = action?.payload?.email,
      state.isLoading =false,
      state.isError = false,
      state.error = ""
    })
    .addCase(loginUser.rejected,(state,action) => {
      state.name ="",
      state.email = "",
      state.isLoading =false,
      state.isError = true,
      state.error = action?.error?.message
    })
  }
});

export const {logOut} = userSlice.actions
export default userSlice.reducer;
