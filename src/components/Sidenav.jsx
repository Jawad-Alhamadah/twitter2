

import React, { useEffect } from 'react'
import { FaHome } from "react-icons/fa";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BsTwitter } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";

function Sidenav(props) {
    let navigate = useNavigate()
    function log() {
        if (localStorage.getItem("username")) {
            localStorage.clear()
            navigate("/login")
        }
        else {
            navigate("/login")
        }
    }
    return (
        <div className='mt-5 fixed left-0 max-[1400px]:w-[5em] '>
            <div className='text-white'>
                <div className='flex flex-col mt-5 space-y-7 max-xl:ml-0 ml-32 bg-black rounded-md '>

                    <h1 onClick={() => navigate("/")} className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center max-md:text-sm  space-x-2 text-2xl '><FaHome />  <span onClick={() => navigate("/")} className=' max-[1400px]:hidden'>Home</span></h1>
                    <h1 onClick={log} className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center max-md:text-sm  space-x-2 text-2xl '> <FaMagnifyingGlass />          <span className=' max-[1400px]:hidden'>{localStorage.getItem("username") ? "logout" : "Login"}</span></h1>
                    <h1 className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center space-x-2 max-md:text-sm text-2xl '><FaRegBell />         <span className=' max-[1400px]:hidden'>Notifications</span>   </h1>
                    <h1 className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center space-x-2 max-md:text-sm text-2xl '><IoMailOpenOutline /> <span className=' max-[1400px]:hidden'>Messages</span> </h1>
                    <h1 className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center space-x-2 max-md:text-sm text-2xl '><FaUserFriends />             <span className=' max-[1400px]:hidden'>Communites</span>  </h1>
                    <h1 className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center space-x-2 max-md:text-sm text-2xl '><BsTwitter />      <span className=' max-[1400px]:hidden'>Premium</span>  </h1>
                    <h1 className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center space-x-2 max-md:text-sm text-2xl '><FaUser />             <span className=' max-[1400px]:hidden'>profile</span>  </h1>
                    <h1 className='p-1 rounded-3xl hover:bg-gray-800 cursor-pointer flex items-center space-x-2 max-md:text-sm text-2xl '><CgMoreO />       <span className=' max-[1400px]:hidden'>more</span>   </h1>

                    <div className='flex space-x-3 items-center'>
                        <div onClick={() => navigate("/personalPage")} className='cursor-pointer rounded-full max-sm:size-5 size-10 bg-blue-900'>
                            <img src={localStorage.getItem("userImage")} alt="oops" />
                        </div>
                        <div className='max-[1400px]:hidden'>{localStorage.getItem("username")}</div> {
                            //from local storage
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Sidenav
