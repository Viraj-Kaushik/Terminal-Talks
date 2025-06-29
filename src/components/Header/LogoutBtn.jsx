import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {

        authService.logout()
        .then( () => {
            dispatch(logout())
        } )

    }

  return (
    
    <button onClick={logoutHandler} 
    className='inline-bock px-3 sm:px-6 py-2 text-sm sm:text-base duration-200 hover:bg-[#DCA06D] hover:text-[#06202B] rounded-full' > 
    Logout 
    </button>
    
  )
}

export default LogoutBtn