import React from 'react'
import { RiTwitterLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

function Login() {
    localStorage.clear("")
    let navigate = useNavigate()
    let [username, setUsername] = React.useState("")
    let [password, setPassword] = React.useState("")

    function handleUsernameChange(event) {

        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        let value = event.target.value

        setPassword(event.target.value)
    }

    async function handleLogin() {


        // withReactContent(Swal).fire({
        //     title: "Are You sure you want to delete?",
        //     showCancelButton: true,
        //     cancelButtonText:"cancel",
        //     confirmButtonColor:"red",
        //     confirmButtonText:"Delete"


        //   }).then(res => {
        //     if (res.isConfirmed) {


        //       if (props.userId === "1") axios.delete(`https://6702f908bd7c8c1ccd404dee.mockapi.io/post/${props.id}`)
        //         .then(res => props.getPosts())
        //     }
        //   })

        if (username.length <= 0 || password.length <= 0) {
            withReactContent(Swal).fire({
                title: "fill all fields",
                confirmButtonText: "close"
            })
        }
        try {

            let data = await axios.get("https://6702f908bd7c8c1ccd404dee.mockapi.io/user", {
                params: {
                    username: username,
                }
            })


            if (data.data.length <= 0) {
                return withReactContent(Swal).fire({
                    title: "Incorrect login Info",
                    confirmButtonText: "close"


                })
            }
            let userInfo = data.data[0]
            console.log(userInfo)
            if (data.status === 200 && userInfo.username.length > 0) {
                if (userInfo.username === username && userInfo.password === password) {
                    
                    localStorage.setItem("username", userInfo.username)
                    localStorage.setItem("id", userInfo.id)
                    localStorage.setItem("userImage", userInfo.userImage)
                    navigate("/")

                }
                else {
                    withReactContent(Swal).fire({
                        title: "Incorrect login Info",
                        confirmButtonText: "close"
                    })
                }

            }
        }
        catch (err) {
            
            if (err.status === 404) {
                withReactContent(Swal).fire({
                    title: "Incorrect login Info",
                    confirmButtonText: "close"


                })
            }
        }

    }



    return (
        <div className='flex w-screen h-screen items-center justify-center'>
            <div className='text-twitterBlue font-bold text-lg space-x-4 fixed top-0'>
                <Link to="/" className='hover:text-white hover:bg-twitterBlue p-1 px-3 rounded-3xl'>Home</Link>
                <Link to="/signup" className='hover:text-white hover:bg-twitterBlue p-1 px-3 rounded-3xl'>Signup</Link>
            </div>
            <div className='flex flex-col sign-shadow   max-md:w-[20em] max-md:h-[35em] w-[30em] items-center h-[37em]'>

                <div className=' w-[35%]'>
                    <RiTwitterLine className="mt-16 mb-3 text-[10em] text-twitterBlue w-[100%]" />
                </div>
                <div className=' items-center space-y-3 flex flex-col'>
                    <div className='flex flex-col space-y-2'><span className=' text-twitterBlue'>Username</span><input onChange={handleUsernameChange} className=' px-2  rounded-2xl' type="text" placeholder='Username' /></div>
                    <div className='flex flex-col space-y-2'><span className=' text-twitterBlue'>Password</span><input onChange={handlePasswordChange} className=' px-2  rounded-2xl' type="text" placeholder='Password' /></div>

                </div>
                <button onClick={handleLogin} className='button-shadow mt-7 bg-twitterBlue font-bold text-xl py-1 px-3'>Login</button>
            </div>

        </div>
    )
}

export default Login
