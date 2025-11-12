import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { userById } from "../../store/userSlice";
import {useParams} from "react-router-dom"

function UserDetail(){
    const {id} = useParams()
    const dispatch=useDispatch()
    const {loading,error,selectedUser} =useSelector(s=>s.user)

    useEffect(()=>{
        dispatch(userById(id))
    },[dispatch,id])

    if(!selectedUser) 
        return <div className="text-center mt-10 text-red-600">
            user not found
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
                user profile
            </h2>
            {selectedUser.avatar && (
                <img src={selectedUser.avatar} alt='avatar'
                    className="mx-auto mb-5 h-24 w-24 rounded-full border-2 border-gray-300"/>

            )}
            <div className="mb-2 text-gray-700">
                {selectedUser.username}
            </div>
            <div className="mb-2 text-gray-700">
                {selectedUser.email}
            </div>
            <div className="mb-2 text-gray-700">
                {selectedUser.role}
            </div>
        </div>
    );
    
}

export default UserDetail