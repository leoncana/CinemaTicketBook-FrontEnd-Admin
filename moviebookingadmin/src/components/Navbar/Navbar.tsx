"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Navbar.sass';
import { toast } from 'react-toastify';

const Navbar = () => {

    const handleLogout = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/admin/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include'
                });
                if (response.ok) {
                    toast.success('Admin logout Successful', {
                    });
                    window.location.href = '/';
                  } else {
                    toast.error('Logout Failed');
                  }
                //console.log('logout');
        } catch (error) {
            toast.error('An error occurred during logout');
            console.error('An error occurred during logout', error);
        }
    }

    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    
    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/admin/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (response.ok) {
                // Admin is authenticated
                setIsAdminAuthenticated(true);
            } else {
                // Admin is not authenticated
                setIsAdminAuthenticated(false);   
            }
        }
        catch (error) {
            console.error('An error occurred during admin authentication check', error);
            setIsAdminAuthenticated(false);
        }
    }

    useEffect(() => {
        checkAdminAuthentication();
    }, []);

    return (
        <div className='navbar'>
            <Link href='/'>Admin Panel</Link>
            
            <div className='adminlinks'>
                {isAdminAuthenticated ? (
                    <>
                        {/* Show links for authenticated admin */}
                        <Link href='/pages/movie/createmovie'>Add Movie</Link>
                        <Link href='/pages/screen'>Add Screen</Link>
                        <Link href='/pages/schedule'>Add Schedule</Link>
                        <span><button onClick={handleLogout}>Logout</button></span>
                    </>
                ) : (
                    <>
                        {/* Show login/signup links for unauthenticated admin */}
                        <Link href='/pages/auth/signin'>Login</Link>
                        <Link href='/pages/auth/signup'>Signup</Link>
                    </>
                )}
            </div>
        </div >
    )
}

export default Navbar