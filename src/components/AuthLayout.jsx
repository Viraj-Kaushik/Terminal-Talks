import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected( {children, authentication = true } ) {

    const [loader,setLoader] = useState(true)
    // status of user
    const authStatus = useSelector( state => state.auth.status )
    const navigate = useNavigate()

    useEffect( () => {

        if (authentication === true && authentication !== authStatus ){
        navigate("/login")
        }
        else if (authentication === false && authentication !== authStatus){
            navigate("/")
        }

        setLoader(false)

    }, [authStatus, authentication, navigate]  )

  return (

    loader? <h1>Loading...</h1> 
    : <> {children} </>

  )

}

