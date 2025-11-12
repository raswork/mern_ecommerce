import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";

function Login(){
        const [input,setInput] = useState("")
        // single to include either email or username as user will
        const [password,setPassword] = useState("")
        const dispatch=useDispatch()
        const {loading,error} = useSelector(s => s.user)
        
        const handleLogin = (e)=>{
            e.preventDefault()
            const isEmail=input.includes("@")
            const payload = isEmail ? {email:input,password} 
                                    : {username:input,password}
        
        dispatch(loginUser(payload))}
        return (
            <form onSubmit={handleLogin} 
                 className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
                    <h2 className="text-xl font-bold mb-4">
                        Login
                    </h2>
                    <input className="input"
                            placeholder="Email or Username"
                            value={input}
                            onChange={e=>setInput(e.target.value)}
                            required
                    />
                    <input className="input"
                            placeholder="password"
                            value={password}
                            onChange={e=>setInput(e.target.value)}
                            required
                    />
                    <button className="btn" type ="submit" 
                            disabled= {loading}>
                                {loading ? "logging in.." : "login"}
                    </button>
                    {error && <p className="text-red-600 mt-2">
                        {error}
                        </p>}
                 </form>
        );
}
export default Login