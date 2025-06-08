'use client'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className='z-10 sticky top-0 bg-primary/40 backdrop-blur-md bg-b text-secondary  flex items-center justify-between p-4 font-trebuchet'>
      <div className='logo text-blue-600 flex gap-2 items-center'>
        <Link href={'/'}><h1 className='font-extrabold text-md md:text-2xl'>Patreon Clone</h1></Link>
        <div className='bg-blue-600 w-1 h-6'></div>
      </div>
      <div className='links'>
        <ul className='flex items-center min-[300px]:text-[9px] min-[410px]:text-xs md:text-lg gap-4 font-bold cursor-pointer'>
          <Link href={'/'}><li className=' hover:text-secondary-dark'>Home</li></Link>
          {session ? <>
           <Link href={'/dashboard'}><li className=' hover:text-secondary-dark'>Dashboard</li></Link>
            <Link href={`/${session?.user.name}`}><li className='flex items-center gap-2 hover:text-secondary-dark'>{session?.user.name}<img className='min-[300px]:w-5 min-[410px]:w-6 lg:w-10 rounded-full' src={session?.user.image} alt="" /></li>
            </Link>

            <li><button onClick={() => signOut()} className='bg-secondary text-primary px-3 py-1 rounded-full text-center hover:bg-secondary-dark md:text-base lg:px-6 lg:py-2 '><IoIosLogOut /></button></li>

          </>

            :
            <Link href={"/login"}><li><button className='bg-secondary text-primary px-2 py-1 rounded-full text-center hover:bg-secondary-dark md:text-base lg:px-6 lg:py-2'>Login</button></li></Link>
          }

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
