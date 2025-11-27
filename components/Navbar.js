'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const Navbar = () => {
  const router = useRouter()
  const [showsearchBar, setshowsearchBar] = useState(false)
  const [searchvalue, setsearchvalue] = useState("")

  const searchMovie = () =>{
    router.push(`/search?q=${searchvalue}`)
  }

  return (
    <div className='relative'>
      <nav className='flex items-center justify-around py-2 bg-[#0c0c0c] text-[#b0b0b0] h-16 m-[3px] mb-0'>
        <div className="logo">
            <Link className='cursor-pointer' href={'/'}><h1 className='text-4xl font-bold'><span className='text-[#b08500]'>9x</span>Movies<span className='text-[#b08500]'>2</span></h1></Link>
        </div>
        <button className='cursor-pointer' onClick={()=>{setshowsearchBar(!showsearchBar)}}>
                    <svg viewBox="0 0 24 24" fill="white" width="18px" height="18px" aria-hidden="true" focusable="false">
                          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                          <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
            </button>
      </nav>
      {showsearchBar&&(<div className='className=" flex justify-center items-center text-white '>
          <div className="search lg:w-1/2 w-10/12 mx-auto bg-[#1d1d1d] fixed top-16 z-10 flex items-center justify-between gap-2 border border-[#2f2f2e] rounded-lg py-1 px-4 ">
              <input value={searchvalue} onChange={(e)=>{setsearchvalue(e.target.value)}} className='text-[#b0b0b0] w-full py-2 px-2 rounded-sm focus:outline focus:outline-gray-900' type="text" placeholder='Search for movies' />
            <button className='cursor-pointer' onClick={searchMovie}>
                <svg viewBox="0 0 24 24" fill="white" width="18px" height="18px" aria-hidden="true" focusable="false">
                          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                          <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
            </button>
        </div>
      </div>)}
    </div>
  )
}

export default Navbar
