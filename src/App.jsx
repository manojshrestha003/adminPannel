import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './Context/AdminContext';
import NavBar from './Components/NavBar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/Admin/DashBoard'

const App = () => {
  const {aToken} = useContext(AdminContext);


  return aToken ? (
   
    <div className='bg-[#F8F9FD]'>
            
            <ToastContainer/>
            <NavBar/>
            <div className='flex items-start'>
              <Sidebar/>
              <Routes>
                <Route path='/' element = {<> </>}/>
                <Route path='/admin-dashboard' element = {<DashBoard/>}/>
              </Routes>
            </div>
            
    </div>
  ):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
