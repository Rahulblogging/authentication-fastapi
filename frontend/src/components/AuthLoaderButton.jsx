import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaArrowRight } from 'react-icons/fa'

const AuthLoaderButton = ({
    isLoading=false,
    text,
    className=''
}) => {

  return (
    <button type="submit" disabled={isLoading} className={`flex items-center justify-center bg-blue-600 disabled:bg-blue-900 cursor-pointer border-none w-full py-3 rounded text-white outline-none gap-x-2 disabled:cursor-no-drop hover:bg-blue-500 ${className}`}>
        <span>{text}</span>
       { isLoading ? <CgSpinner className='animate-spin text-xl text-white' />:
       <FaArrowRight/>}
    </button>
  )
}

export default AuthLoaderButton
