import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Component/Layout/Navbar';
import Sidebar from '../../Component/Layout/Sidebar';
import '../../Component/Layout/layout.css'
import ColorPicker from '../../Component/Layout/colorPicker';

const Root = () => {
  return (
    <div className='root-container'>
      <div className='navbar box-shadow'>
        <Navbar />
      </div>
      <div className='content-container'>
        <div className='sidebar box-shadow'>
          <Sidebar />
        </div>
        <div className='outlet-container'>
          <Outlet />
          {/* <ColorPicker /> */}
        </div>
      </div>
    </div>
  )
}

export default Root;
