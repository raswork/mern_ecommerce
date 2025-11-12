import {useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import {registerUser} from "../../store/userSlice.js"

function Signup(){
    const [form ,setForm] =useState({username:'',email:'',password:''})
    const [avatar,setAvatar]=useState(null)
    const dispatch =useDispatch()
    const {loading,error,successMsg} = useSelector(s => s.user)

    const handleSubmit=(e) =>{
        e.preventDefault()
        const formData=new FormData();
        // js web api class builds up data same way multipart/form-data in html <form>
        formData.append("username",form.username)
        formData.append("email",form.email)
        formData.append("password",form.password)
        if(avatar){
            formData.append("avatar",avatar)
        }
        dispatch(registerUser(formData))
    }

    return (
        <form onSubmit={handleSubmit} 
            className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded"
            encType="multipart/form-data">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <input 
                className="input"
                placeholder="username"
                value={form.username}
                onChange={e => setForm({...form,username:e.target.value})}
                required />
            <input 
                className="input"
                placeholder="email"
                value={form.email}
                onChange={e=>setForm({...form,email:e.target.value})}
                required />
            <input 
                className="input"
                placeholder="password"
                value={form.password}
                onChange={e=>formData({...form,password:e.target.value})}
                required
                />

            <input 
                className="input"
                type="file"
                accept="image/*"
                onChange={e=>setAvatar(e.target.files[0])} />
            <button className="btn" type="submit" disabled={loading}>
                {loading ? "registering..." : "Sign up"}
            </button>
            {error && 
            <p className="text-red-600 mt-2">
                {error}
            </p>}
            {successMsg && <p className="text-green-600 mt-2">
                        {successMsg}</p>}
            </form>

    );
}

export default Signup