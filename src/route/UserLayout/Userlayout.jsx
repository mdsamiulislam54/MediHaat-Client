import React from 'react'
import Login from '../../page/userAuthentication/Login/Login'
import SignUp from '../../page/userAuthentication/SignUp/SignUp'
import { Outlet } from 'react-router'

const Userlayout = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Userlayout