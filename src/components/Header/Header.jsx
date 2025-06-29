import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
    
    <header className='py-3 pt-5 shadow bg-[#06202B] px-4'>

      <Container>

        {/* navbar */}

        <nav className='flex items-center justify-between'>

        {/* logo */}

          <div className='mr-0 sm:mr-4 mb-4 sm:mb-0'>

            <Link to = '/'>
              <Logo width='70px' className='w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24' />
            </Link>

          </div>

        {/* unordered list for nav items */}

          <ul className='hidden md:flex ml-auto flex-wrap justify-center sm:justify-end gap-2 sm:gap-0'>

            { navItems.map( (item) => 
              item.active? (              // used () instead of {} to avoid return statement
                <li key={item.name}>

                  <button
                  onClick={ () => navigate(item.slug)}
                  className={`inline-block px-3 sm:px-6 py-2 text-sm sm:text-base duration-200 rounded-full ${ 
                  location.pathname === item.slug? 'bg-[#7AE2CF] text-[#06202B]'
                  : 'text-[#7AE2CF]  hover:text-[#03A6A1]'
                  }`}
                  >

                    {item.name}

                  </button>

                </li>
              ) 
              : null                  // if not active
            ) }

            {/* logout btn */}

            { authStatus && (           // only if authStatus is true
              <li
              className='text-[#DCA06D] hover:text-[#641B2E] mt-2 sm:mt-0 '>
                <LogoutBtn />
              </li>
            ) }

          </ul>


          {/* Mobile Menu Button */}

          <button
            onClick={toggleMobileMenu}
            className='md:hidden text-[#7AE2CF] focus:outline-none'
            aria-label="Toggle navigation menu"
          >
            <svg
              className='w-6 h-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {isMobileMenuOpen ? (
                <path d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>

            
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden mt-4 pb-4'>
            <ul className='flex flex-col space-y-2'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm duration-200 rounded-full ${
                        location.pathname === item.slug
                          ? 'bg-[#7AE2CF] text-[#06202B]'
                          : 'text-[#7AE2CF] hover:bg-[#7AE2CF] hover:text-[#06202B]'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {/* Mobile Logout btn */}
              {authStatus && (
                <li className='pt-2 text-[#DCA06D] hover:text-[#641B2E]'>
                  <div onClick={() => setIsMobileMenuOpen(false)}>
                    <LogoutBtn />
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}

      </Container>

    </header>
    
  )
}

export default Header