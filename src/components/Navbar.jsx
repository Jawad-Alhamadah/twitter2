import React from 'react'
import { PiMagnifyingGlassLight } from "react-icons/pi";

function Navbar() {
    return (
        <div className='px-3 z-10 space-x-11 mr-3 w-[100%] fixed flex top-0 justify-end bg-[#000000] '>
             <div className=' w-[38em] flex font-normal text-white border-[1px] border-gray-700 bg-[#000000]'>
                    <div className='h-10 cursor-pointer  flex justify-center items-center hover:bg-gray-900 text-center w-[50%] '><span className=' p-1 border-b-[#4458ef] border-b-[5px]'>For You</span></div>

                    <div className='h-10  cursor-pointer flex justify-center items-center hover:bg-gray-900 text-gray-500 text-center w-[50%] '>Follow</div>
                </div>
            <div className='w-[20em] text-white items-center my-2 p-2 flex bg-[#202327] rounded-3xl'>

                
                <div className='px-6'><PiMagnifyingGlassLight className='text-lg text-gray-400' /></div>
                <input placeholder='Search' className='focus:outline-none bg-[#202327] w-[100%]'></input>

            </div>
        </div>
    )
}

export default Navbar
