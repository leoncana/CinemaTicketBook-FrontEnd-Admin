"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import '../auth.sass'
import { redirect } from 'next/navigation'


const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful signup, e.g., show a success message
        console.log('Admin registration successful', data);
        toast.success('Admin Registration Successful', {
        });
        window.location.href = '/';
      } else {
        // Handle signup error
        console.error('Admin registration failed', response.statusText);
        toast.error('Admin Registration Failed');
      }
    }
    catch (error) {
      toast.error('An error occurred during registration');
      console.error('An error occurred during registration', error);
    }
  }


  return (
    <div className='formpage' style={{
      display: 'flex',
      flexDirection: 'column',
  }}>
      <input type='text' placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type='email' placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type='password' placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  )
}

export default SignupPage