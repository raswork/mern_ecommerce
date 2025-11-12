import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {fetchAllUsers} from "../../store/userSlice"

function UsersList(){
    const dispatch=useDispatch()
    const {token,allusers,loading,error} = useSelector(s=>s.user)
    
    useEffect(()=>{
        if(token) 
            dispatch(fetchAllUsers(token))},[dispatch,token])
    
    if(!token) 
        return <div className="text-center mt-10 text-red-600">
            Admin access only
        </div>

    if(loading) 
        return <div className="text-center mt0-10">
        Loading..
        </div>

    if(error) return <div className="text-center text-red-600 mt-10">
        {error}
    </div>
    return (
        <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                All Users
            </h2>
            <ul>
                {allusers.map(u=>(
                    <li className="flex items-center py-2 border-b last:border-b-0" key={u._id}>
                        {u.avatar && (
                            <img src={u.avatar} alt="avatar" className="mr-3 h-10 w-10 rounded-full border"/>
                        )}
                        <span className="text-gray-800 font-semibold">
                            {u.username}
                        </span>
                        <span className="ml-4 text-gray-500">
                            {u.email}
                        </span>
                        <span className="ml-auto px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                            {u.role}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList