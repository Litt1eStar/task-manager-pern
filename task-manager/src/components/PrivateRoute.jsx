import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function PrivateRoute() {
    const user = Cookies.get('token')
    return user ? <Outlet /> : <Navigate to='/signin' />
}
