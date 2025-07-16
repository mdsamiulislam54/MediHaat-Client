import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../../components/Footer/Footer'
import PageTitle from '../../components/PageTitle/PageTitle'

const mainLayout = () => {
  return (
    <div>
        <PageTitle title={'Home'}/>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default mainLayout