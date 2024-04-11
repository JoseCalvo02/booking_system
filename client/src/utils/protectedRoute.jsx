import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from './tokenUtils';

export const ProtectedRoute = () => {
    if (isAuthenticated()) {
        return <Outlet />;
    }

    return <Navigate to='/auth' />;
}
