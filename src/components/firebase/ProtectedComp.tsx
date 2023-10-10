import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from './Authe';

interface ProtectedProp {
    children: JSX.Element;

}

export default function Protected({ children }: ProtectedProp) {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to='/' />
    }
    return children;
}
