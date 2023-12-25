'use client';

import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import { usePathname } from 'next/navigation'


const NavBar = () => {

  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues'},
    { label: 'About', href: '/about'},
  ]


  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
        <Link href='/'><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => (
                <Link key={link.href} href={link.href} className={` hover:text-zinc-800 transition-colors ${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'}`}>{link.label}</Link>
            ))}
            {/* <li><Link className='text-zinc-500 hover:text-zinc-800' href='/'>Dashboard</Link></li>
            <li><Link href='/issues'>Issues</Link></li> */}
        </ul>
    </nav>
  )
}

export default NavBar
