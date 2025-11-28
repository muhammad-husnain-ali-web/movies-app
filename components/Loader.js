import React from 'react'

const Loader = () => {
    return (
        <>
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4 animate-spin border-t-gray-500"></div>
            <p className="text-white text-lg">Loading...</p>
        </>
    )
}

export default Loader
