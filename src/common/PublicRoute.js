import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = () => {
    const token = localStorage.getItem('accessToken');
    const roleId = localStorage.getItem('role_id');

    return(
        token  ? <Navigate  to={roleId == "5" ? "/home" : "/news-category"}  /> : <Outlet/>
    )
}

export default PublicRoute