'use client';
import { useEffect, useState, useRef } from 'react';

import { redirect } from 'next/navigation';
import Loader from '@/components/Loader';


export default function VideoAdPlayer({ params }) {

  const [seconds, setSeconds] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [movieshow, setmovieshow] = useState(false)

  const [showDownloadAd, setShowDownloadAd] = useState(false);
  const [downloadAdSeconds, setDownloadAdSeconds] = useState(5);
  const [canSkipDownloadAd, setCanSkipDownloadAd] = useState(false);
  const [skipdownload, setskipdownload] = useState(true)

  const [moviesData, setmoviesData] = useState(null)
  const [movieurl, setmovieurl] = useState(null)
  const [downloadlink, setdownloadlink] = useState(null)

  const getmovie = async () => {

    const { movie } = await params
    const movieName = movie.replaceAll("-", " ")
    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieName })
    })
    let res = await r.json();

    if (res && res.Movie) {
      setmoviesData(res)
    }
    else {
      redirect('/not-found');
    }

  }

  useEffect(() => {
    getmovie();
  }, [])


  const adplay = () => {
    setShowAd(true)

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setCanSkip(true);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  };
  const handleSkip = async () => {

    const { movie } = await params
    const movieName = movie.replaceAll("-", " ")
    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/movie`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieName })
    })
    let res = await r.json();
    setmovieurl(res)

    setmovieshow(true)
  };
  const handledownloadskip = async () => {

    const { movie } = await params
    const movieName = movie.replaceAll("-", " ")
    let r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/download`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieName })
    })
    let res = await r.json();
    setdownloadlink(res)

    setShowDownloadAd(false); // Hide ad
    setskipdownload(false)
  };

  const download = () => {
    setShowDownloadAd(true);
    setDownloadAdSeconds(5);
    setCanSkipDownloadAd(false);

    const timer = setInterval(() => {
      setDownloadAdSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setCanSkipDownloadAd(true);
        }
        return prev - 1;
      });
    }, 1000);
  };




  return (
    <div className='lg:container lg:mx-auto bg-[#111111] lg:min-h-[93vh] min-h-[100vh] text-white lg:px-10 '>
      {moviesData ? (<div className="movies flex flex-col items-center">
        <div className="relative movieStream flex justify-center">
          {showAd ? (
            !movieshow && (<div className="adContainer relative">

              <div>
                <img className='advideo rounded-lg lg:w-[640px] lg:h-[360px] w-[350px] h-[180px]' src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/ad3d7758575499.5a01afacbe9c6.jpg" alt="gghh" />
              </div>


              <div className="skipbutton absolute right-3 lg:bottom-20 bottom-10 z-10 bg-[#0c0c0c] py-1 px-2 rounded-sm cursor-pointer">
                <button className='cursor-pointer' onClick={handleSkip} disabled={!canSkip}>
                  {canSkip ? 'Skip Ad' : `Skip Ad (${seconds}s)`}
                </button>
              </div>

            </div>)
          ) : (

            <div className='cursor-pointer' onClick={adplay}>
              <img className='advideo rounded-lg lg:w-[640px] lg:h-[360px] w-[350px] h-[180px]' src={moviesData.MovieThumbnail} alt={moviesData.Movie} />
              <div className="play absolute top-[35%] left-[45%] z-10 cursor-pointer" onClick={adplay}>
                <img className='lg:w-[80px] w-[40px] sm:w-[60px]  cursor-pointer' src="/youtube-stroke-rounded (1).svg" alt="" />
              </div>
            </div>
          )}
          {movieshow && (
            movieurl ? (
              <div className="moviePlayer ">
                <iframe className='lg:w-[640px] lg:h-[360px] w-[300px] h-[200px]'
                  src={`https://${movieurl.MovieUrl}`}
                  width="640"
                  height="360"
                  allow="autoplay"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className='text-8xl text-white bg-black py-3 p-2'>Error</p>
            )
          )}

        </div>


        <div className="info my-10 flex gap-2 max-w-[90%] mx-auto">
          <div className="imag">
            <img className='lg:w-[200px] w-[150px]' src={moviesData.Picture} alt={moviesData.Movie} />
          </div>
          <div className="desc w-[430px] flex flex-col gap-2 mx-0">
            <h2 className='font-bold lg:text-3xl text-sm'>{moviesData.Movie}</h2>
            <div>
              <span className='lg:text-xl text-gray-500 text-[10px]'>{moviesData.MovieDetails}</span>
            </div>

            <div className="h-[1px] bg-[#b0b0b0] lg:w-full w-10/12 opacity-25 "></div>

          </div>
        </div>


        <div className="h-[1px] bg-[#b0b0b0] mx-auto lg:w-[50%] w-[90%] opacity-25"></div>

        <div className="download my-13">
          {showDownloadAd && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-[#222] p-4 rounded-lg relative">
                <img className='advideo rounded-lg lg:w-[640px] lg:h-[360px] w-[300px] h-[180px]' src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/ad3d7758575499.5a01afacbe9c6.jpg" alt="gghh" />

                <div className="skipbutton absolute right-2 top-5 z-10 bg-[#0c0c0c] py-1 px-2 rounded-sm cursor-pointer">
                  <button className='cursor-pointer' onClick={handledownloadskip} disabled={!canSkipDownloadAd}>
                    {canSkipDownloadAd ? 'X' : `(${downloadAdSeconds}s) X`}
                  </button>
                </div>
              </div>




            </div>
          )}


          {skipdownload ? (
            <button className="skipdownload w-fit text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer" onClick={download}>
              downlod
            </button>
          ) : (
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
              <a
                href={`https://drive.google.com/uc?export=download&id=${downloadlink.MovieId}`}
                download
                target="_blank"
              >
                Download Video
              </a>
            </button>
          )}

        </div>
      </div>) :
        (<div className="flex justify-center items-center h-screen">
          <Loader />
        </div>

        )}
    </div>
  );
} 