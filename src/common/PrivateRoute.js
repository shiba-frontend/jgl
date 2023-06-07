import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const token = localStorage.getItem('accessToken');

    return(
        token ? <Outlet/> : <Navigate to="/"  />
    )
}

export default PrivateRoute