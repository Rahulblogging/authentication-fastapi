import React, { useEffect, useState } from 'react'
import { useMainContext } from '../context/MainContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedLayout = () => {

    const {user}= useMainContext()
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){

            // return <Navigate to={'/login'}/>
            navigate("/login")
        }else{
            setLoading(false)
        }
    },[user])

    if(loading){
        return <div>Loading...</div>
    }

  return (
    <>
    <Outlet />
    </>
  )
}

export default ProtectedLayout