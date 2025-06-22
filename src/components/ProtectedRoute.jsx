import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const [isAuth, setisAuth] = useState(false);
    // const navigate = useNavigate();

    if (!isAuth){
        return <Navigate to="/login" replace />
    }
    else{
        return children
    }
}

export default ProtectedRoute
