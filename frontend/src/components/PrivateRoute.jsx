import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus.js'
import Spinner from '../components/Spinner.jsx'

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) return <Spinner />

    // if(loggedin then go to privateRoute else navigate to login)
    return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
