import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = () => {
    const token = localStorage.getItem('accessToken');
    const roleId = localStorage.getItem('role_id');



    return(
        token  ? <Navigate  to={roleId == "3" ? "/news-category" : roleId == "5" ? "/home" : "/dashboard" }  /> : <Outlet/>
    )
}

export default PublicRoute