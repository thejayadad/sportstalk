'use client'
import React from 'react'
import AuthLinks from './AuthLinks'
import Logo from '@/components/Logo/Logo'

const Navbar = () => {
  return (
    <header className='px-4 py-8'>
        <nav className='flex justify-between mx-auto max-w-screen-xl'>
        <Logo size={'180px'} />
            <AuthLinks />
        </nav>
    </header>
  )
}

export default Navbar