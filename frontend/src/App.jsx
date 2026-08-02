import React, { useEffect } from 'react'
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { axiosClient } from './utils/axiosClient'
import {MainContextProvider} from './context/MainContext'
import ProtectedLayout from './layout/ProtectedLayout'


const App = () => {

  const checkServerHealth=async()=>{
    const response = await axiosClient.get("/health")
    const data = await response.data
    console.log(data);
  }

  useEffect(()=>{
    checkServerHealth()
  },[])

  return (
    <MainContextProvider>
    <div className="min-h-screen flex flex-col">
    <Navbar/>
    
     <main className="flex-1 px-4">
       <Routes>
      {/* <Route path='/' Component= {HomePage} /> */}

      <Route path='/'  Component={ProtectedLayout}> 
      <Route index Component= {HomePage} />
      <Route path="/profile" Component= {ProfilePage} />
      </Route>
      
      <Route path='/login' Component= {LoginPage} />
      <Route path='/register' Component= {RegisterPage} />
      </Routes>
     </main>

    <Footer / >
    </div>
    </MainContextProvider>
  )
}

export default App
