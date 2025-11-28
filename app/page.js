'use client'
import Card from "@/components/Card"
import Loader from "@/components/Loader";

import { useEffect } from "react";
import { useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState(null)



  const getmovies = async () => {
    let req = await fetch("api/get")
    let movies = await req.json();
    const reverseMovies = movies.reverse()
    setMovies(reverseMovies)
  }

  useEffect(() => {
    getmovies();

  }, [])


  return (
    <div className="lg:container lg:mx-auto bg-[#111111] min-h-screen text-white lg:px-10">
      <div className="flex flex-col justify-center ">

        <h1 className="font-bold text-3xl text-center lg:my-16 my-3 mx-2">9xmovie2 Bollywood Movies & TV Shows - Free Collection</h1>

        <div className="h-[1px] bg-[#b0b0b0] w-full opacity-25"></div>


        <div className=" lg:my-16 lg:mb-10 my-3 mb-2">
          <h2 className="font-bold lg:mx-10 mx-2">Recently added in Bollywood</h2>
        </div>

        <div className="h-[1px] bg-[#b0b0b0] w-full opacity-25"></div>


        {movies ? (
          movies && <Card searchMovies={movies} />
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader />
          </div>
        )}

      </div>
    </div>

  );
}
