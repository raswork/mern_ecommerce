import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../services/api"

export const registerUser=createAsyncThunk("user/register",api.registerUser)
export const loginUser=createAsyncThunk("user/login",api.loginUser)
export const logoutUser=createAsyncThunk("user/logout",api.logoutUser)
export const userProfile=createAsyncThunk("user/profile",api.userProfile)
export const fetchAllusers=createAsyncThunk("user/list",api.allusers)
export const userById=createAsyncThunk("user/getById",api.userById)
export const refreshToken=createAsyncThunk("user/refreshToken",api.refreshToken)

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        token:localStorage.getItem("token"),
        allusers:[],
        selectedUser:null,
        loading:false,
        error:null,
        successMsg:""
    },
    reducers:{
        logoutLocal:(state) =>{
            state.user=null;
            state.token=null;
            localStorage.removeItem("token");
        },
    },
    extraReducers:(builder) => {
        builder
               .addCase(registerUser.pending,(state)=>{
                    state.loading=true;
                    state.error=null})
                .addCase(registerUser.fulfilled,(state)=>{
                    state.loading=false;
                    state.successMsg="registration successfull"
                })
                .addCase(registerUser.rejected,(state,action)=>{
                    state.loading=false;
                    state.error=action.error.message
                })
                // LOGIN ACTION
                .addCase(loginUser.pending,(state)=>{
                    state.loading=true;
                    state.error=null;
                })
                .addCase(loginUser.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.token=action.payload.token;
                    localStorage.setItem("token",action.payload.token)
                })
                .addCase(loginUser.rejected,(state,action)=>{
                    state.loading=false;
                    state.error=action.error.message
                })
                // LOGOUT 
                .addCase(logoutUser.fulfilled,(state)=>{
                    state.user = null;
                    state.token=null;
                    localStorage.removeItem("token")
                })
                
                .addCase(userProfile.fulfilled,(state,action)=>{
                    state.user=action.payload.data
                })
                .addCase(fetchAllusers.fulfilled,(state,action)=>{
                    state.allusers=action.payload.data
                })
                .addCase(userById.fulfilled,(state,action)=>{
                    state.selectedUser=action.payload.data
                })

                .addCase(refreshToken.fulfilled,(state,action)=>{
                    state.token=action.payload.accessToken;
                    localStorage.setItem("token",action.payload.accessToken)
                })     
    }
});

export const {logoutLocal}=userSlice.actions;
export default userSlice.reducer
