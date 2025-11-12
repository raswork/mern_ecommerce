import axios from 'axios'
const API=axios.create({
    baseURL:"http://localhost:8000/api"
})

// users 
export const login=(data)=>API.post("/users/login",data);

export const signup=(formData)=>API.post("/users/register",formData,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
});

export const logout=()=>API.post("/users/logout");

export const userProfile=(token) => API.get("/users/profile",{headers:{Authorization:`Bearer${token}`}})

export const userById=(id)=>API.get(`/users/${id}`) 
// any user can search  other user by id

export const allusers=(token)=>API.get("/allusers/",{
    headers:{Authorization:`Bearer${token}`}
})

export const refreshToken=()=>API.get("/users/refresh")


