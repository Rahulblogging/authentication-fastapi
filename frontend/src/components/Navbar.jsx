import React from 'react'
import { Link } from 'react-router-dom'
import { useMainContext } from '../context/MainContext'

const Navbar = () => {

  const { user,LogoutHandler } = useMainContext()

  return (
    <header className="text-gray-400 bg-white body-font">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"} className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Authentication</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to={"/"} className="mr-5 hover:text-grey">Home</Link>

          {user ? <button onClick={LogoutHandler} className="inline-flex items-center bg-blue-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 text-white cursor-pointer">Logout
          </button> : <>
            <Link to={"/login"} className="mr-5 hover:text-grey">Login</Link>
            <Link to={"/register"} className="mr-5 hover:text-grey">Register</Link>
          </>

          }

        </nav>

      </div>
    </header>

  )
}

export default Navbar