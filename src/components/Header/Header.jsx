import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {

  const authStatus = useSelector( (state) => state.auth.status )

  const navigate = useNavigate()

  const navItems = [
    {
      name : "Home",
      slug : "/",
      active : true,
    },
    {
      name : "Login",
      slug : "/login",
      active : !authStatus,
    },
     {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  

  ]

  return (
    
    <header className='py-3 pt-5 shadow bg-[#06202B]'>

      <Container>

        {/* navbar */}

        <nav className='flex'>

        {/* logo */}

          <div className='mr-4'>

            <Link to = '/'>
              <Logo width='70px' className='w-24 h-24' />
            </Link>

          </div>

        {/* unordered list for nav items */}

          <ul className='ml-auto flex'>

            { navItems.map( (item) => 
              item.active? (              // used () instead of {} to avoid return statement
                <li key={item.name}>
                  <button
                  onClick={ () => navigate(item.slug) }
                  className='inline-bock text-[#7AE2CF] px-6 py-2 duration-200 hover:bg-[#7AE2CF] hover:text-[#06202B] rounded-full'
                  > {item.name} </button>
                </li>
              ) 
              : null                  // if not active
            ) }

            {/* logout btn */}

            { authStatus && (           // only if authStatus is true
              <li
              className='text-[#DCA06D] hover:text-[#641B2E] '>
                <LogoutBtn />
              </li>
            ) }

          </ul>


        </nav>

      </Container>

    </header>
    
  )
}

export default Header