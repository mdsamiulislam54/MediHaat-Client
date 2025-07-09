import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router'

const mainLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default mainLayout