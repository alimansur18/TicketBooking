import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectRoutes = (props) => {
    const { Component } = props;
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Component />
        </>
    )
}

export default ProtectRoutes;