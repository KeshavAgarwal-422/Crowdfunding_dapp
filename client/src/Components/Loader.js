import React from 'react'
import loader from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className='flex  flex-1 justify-center items-center'>
        
  <img src={loader} alt="No image!" />
    </div>
  )
}

export default Loader