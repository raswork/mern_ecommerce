import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {userProfile,logoutLocal, } from "../../store/userSlice"

function Profile (){
    const dispatch=useDispatch()
    const {user,token,loading,error} =useSelector(s=>s.user)
    useEffect(()=>{
        if(token){
        dispatch(userProfile(token))}
    },[dispatch,token])
    if(!token) return <p>Please login </p>
    if(loading) return <p> loading.. </p>
    if(!user) return <p>no profile found </p>

    return (
        <div className='max-w-md mx-auto m-8 bg-white p-6 shadow rounded'>
            <h2 className='text-2xl font-bold mb-4'>My profile</h2>
            {user.avatar && (<img src={user.avatar} alt="avatar"
                className='mb-4 h-24 w-24 rounded-full'/>    
        )}
        <div className='mb-2 text-gray-700'>
            <span className='font semibold'>Username:</span>
                {user.username}
        </div>
        <div className='mb-2 text-gray-700'>
            <span className='font semibold'>email:</span>
                {user.email}
        </div>
        <div className='mb-2 text-gray-700'>
            <span className='font semibold'>role:</span>
                {user.role}
        </div>
        <button onClick={()=>dispatch(logoutLocal())}
        className='block w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition'>
            logout
        </button>
        {error && 
            <div className='mt-3 text-center text-red-500'>
                {error}
            </div>
        }

        </div>
    )
}

export default Profile;