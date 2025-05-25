import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  
  const[loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect( () => {

    authService.getCurrentUser()
    .then( (userData) => {

      if(userData){
        dispatch( login( {userData} ) )
      }
      else{
        dispatch(logout())
      }

    } )
    .finally( () => {
      setLoading(false)
    } )

  }, [] )


  // if in loadig state

  if(loading){
    return null;
  }
  else{

    return(

      <div className='bg-[#077A7D] min-h-full'>

        <div>

          <Header />

          <main>

            <Outlet />

          </main>
          
          <Footer />

        </div>

      </div>

    )
  }

}
 
export default App
