import React from 'react'
import { UserAuth } from '../../hooks/userAuth/userAuth'
import { Navigate, useLocation } from 'react-router'
import Loader from '../../components/Loader/Loader'
const PrivateRoute = ({children}) => {
    const {user,loading} = UserAuth()
    const {pathname} = useLocation()

    if(loading){
        return <Loader/>
    }
    if(!user){
        return <Navigate to={'/login'} state={{pathname}}></Navigate>
    }
    
    return children
}

export default PrivateRoute