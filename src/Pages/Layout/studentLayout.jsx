import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../Component/Layout/layout.css'
import ColorPicker from '../../Component/Layout/colorPicker';
import StudentNavbar from '../../Component/Layout/StudentNavbar';

const StudentLayout = () => {
  return (
    <div className='root-container'>
      <div className='navbar box-shadow-3'>
        <StudentNavbar />
      </div>
      <div className='outlet-container'>
          <Outlet />
            <ColorPicker />
        </div>
    </div>
  )
}

export default StudentLayout;
