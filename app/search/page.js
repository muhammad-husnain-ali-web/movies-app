'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Card from '@/components/Card'

const Search = () => {

  const searchParam = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParam.get("q"))
  const [movieFound, setMovieFound] = useState(true)
  const [searchMovies, setSearchMovies] = useState(null)

  const searchMovie = async () => {
    console.log(searchQuery)

    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search: searchQuery })
    })

    let res = await r.json();
    console.log(res)

    if (res.success) {
      setSearchMovies(res.result)
      setMovieFound(true)
    } else {
      setMovieFound(false)
    }
  }

  // Update searchQuery when URL param changes
  useEffect(() => {
    setSearchQuery(searchParam.get("q"))
  }, [searchParam])

  // Call API whenever searchQuery updates
  useEffect(() => {
    if (searchQuery) {
      searchMovie()
    }
  }, [searchQuery]) 


  return (
    <div className="lg:container lg:mx-auto bg-[#111111] min-h-screen text-white lg:px-10">
      <div className="flex flex-col justify-center ">
        <h1 className="font-bold text-3xl text-center lg:my-16 my-3 mx-2">
          Search Results for: <span className='text-blue-400'>{searchQuery}</span>
        </h1>

        <div className="h-[1px] bg-[#b0b0b0] w-full opacity-25"></div>

        {movieFound ? (
          <Card searchMovies={searchMovies} />
        ) : (
          <div className='flex flex-col'>
            <h1 className="font-bold text-3xl text-center lg:my-16 my-3 mx-2">Nothing Found</h1>
            <div className="h-[1px] bg-[#b0b0b0] w-full opacity-25"></div>
            <p className='text-2xl'>Sorry, but nothing matched your search terms. Please try again with different keywords.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
