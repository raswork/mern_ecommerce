import axios from 'axios'
const API=axios.create({
    baseURL:"http://localhost:8000/api"
})

// auth
export const login=(data)=>{
    API.post("/users/login",data)
}

export const signup=(data)=>{
    API.post("/users/register",data)
}