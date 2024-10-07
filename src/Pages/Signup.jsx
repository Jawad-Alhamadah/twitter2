import React from 'react'
import { RiTwitterLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';


function Signup() {
    const Navigate = useNavigate()
    let [username, setUsername] = React.useState("")
    let [password, setPassword] = React.useState("")
    let [email, setEmail] = React.useState("")


    function handlePassword(event) {

        setPassword(event.target.value)
    }

    function handleUsernameChange(event) {

        setUsername(event.target.value)
    }

    function handleEmailChange(event) {

        setEmail(event.target.value)
    }



    function validateInput() {
        let isEmptyField = email.length <= 0 || password.length <= 0  || username.length <= 0

        if (isEmptyField) {

            withReactContent(Swal).fire({
                title: "Please Fill all Fields",
                confirmButtonText: "close",
                icon:"info"
                
            })
            return false
        }


        let isValidEmail = String(email).toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (!isValidEmail) {
            withReactContent(Swal).fire({
                title: "Invaild email",
                confirmButtonText: "close",
                icon:"error"
                
            })
            return false
        }

        if (username.length <= 6) {
            withReactContent(Swal).fire({
                title: "username length must be 6 or longer",
                confirmButtonText: "close",
                icon:"info"
                
            })
            return false
        }
        if (username.length >= 30) {
            withReactContent(Swal).fire({
                title: "user too long. Must be less than 30",
                confirmButtonText: "close",
                icon:"info"
                
            })
            return false
        }
        if (password.length <= 5) {
            withReactContent(Swal).fire({
                title: "minimum password length is 5",
                confirmButtonText: "close",
                icon:"info"
                
            })
            return false
        }

        return true
    }


    function signup(){
        let isValid =validateInput()
        if(isValid) {
            axios.post("https://6702f908bd7c8c1ccd404dee.mockapi.io/user",{
                username:username,
                password:password,
                userImage:"https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
            })
            .then(res=>{
                localStorage.setItem("username",res.data.username)
                localStorage.setItem("id",res.data.id)
                localStorage.setItem("userImage",res.data.userImage)
                Navigate("/")
            })
            
        }
        else{
            
        }
    }

    localStorage.clear("")
    return (
        <div className='flex w-screen h-screen items-center justify-center'>
            <div className='text-twitterBlue font-bold text-lg space-x-4 fixed top-0'>
                <Link to="/"  className='hover:text-white hover:bg-twitterBlue p-1 px-3 rounded-3xl'>Home</Link>
                <Link  to="/login" className='hover:text-white hover:bg-twitterBlue p-1 px-3 rounded-3xl'>Login</Link>
            </div>
            <div className='flex flex-col sign-shadow   max-md:w-[20em] max-md:h-[35em] w-[30em] items-center h-[37em]'>
          
                <div className=' w-[35%]'>
                    <RiTwitterLine className="mt-16 mb-3 text-[10em] text-twitterBlue w-[100%]" />
                </div>
                <div className=' items-center space-y-3 flex flex-col'>
                   <div className='flex flex-col space-y-2'><span className=' text-twitterBlue'>Email</span><input  onChange={handleEmailChange} className='  px-2 rounded-2xl' type="text" placeholder='Email'/></div>
                   <div className='flex flex-col space-y-2'><span className=' text-twitterBlue'>Username</span><input onChange={handleUsernameChange}  className=' px-2  rounded-2xl' type="text" placeholder='Username'/></div>
                   <div className='flex flex-col space-y-2'><span className=' text-twitterBlue'>Password</span><input  onChange={handlePassword} className=' px-2  rounded-2xl' type="text" placeholder='Password'/></div>
                  
                    
                   
                </div>
                <button onClick={signup} className='button-shadow mt-7 bg-twitterBlue font-bold text-xl py-1 px-3'>Signup</button>
            </div>

        </div>

    )
}

export default Signup
