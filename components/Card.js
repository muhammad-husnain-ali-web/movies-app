import React from 'react'

const Card = ({ searchMovies }) => {
    return (
        <div className="cards flex flex-row lg:gap-8 gap-2 flex-wrap mx-2 sm:pl-10 lg:pl-5 xl:pl-15">
            {searchMovies && searchMovies.map((movie, index) => {
                return (<div key={index} className="card w-[23%] lg:w-[22%] lg:my-8 my-2 relative">
                    <div className="image" >
                        <a href={`movies/${movie.Movie.replaceAll(" ", "-")}`} title={movie.Movie}>
                            <img className="w-full" src={movie.Picture} alt={movie.Movie} />
                        </a>
                        <span className="bg-red-700 w-fit lg:p-1 p-0.5 rounded-sm absolute lg:top-2 lg:right-2 top-0.5 right-0.5 text-[10px] lg:text-4xl sm:text-lg">{movie.Type}</span>
                    </div>
                    <div className="movie-item-content h-[20px] w-full lg:text-[20px] lg:h-fit overflow-hidden">
                        <h3 className="w-full truncate"><a href={`movies/${movie.Movie.replaceAll(" ", "-")}`}>{movie.Movie}</a></h3>
                        <span className="movie-year">2025</span>
                    </div>
                </div>)
            })}

        </div>
    )
}

export default Card
