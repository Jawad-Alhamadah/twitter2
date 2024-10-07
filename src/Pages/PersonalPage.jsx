
import React, { useEffect } from 'react'

import CommentSection from '../components/CommentSection';
import Post from '../components/Post';
import axios from 'axios';

import Trend from '../components/Trend';
import UserCard from '../components/UserCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { PiMagnifyingGlassLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Sidenav from '../components/Sidenav';
 
function PersonalPage() {
    let [posts, setPosts] = React.useState([])
    useEffect(() => {
        getPosts()
    }, [])
    function getPosts() {

        axios.get("https://6702f908bd7c8c1ccd404dee.mockapi.io/post?username="+localStorage.getItem("username"))
            .then(res => {
                console.log(res)
                
                // res.data.sort((a, b) => b.id-a.id)
                setPosts(
                    res.data
                    // res.data
                )
            }
            )
    }
    return (

        <div className='max-sm:space-x-0 space-x-10 max-sm:p-0 px-4  xl:px-14  2xl:px-40 flex max-lg:justify-center justify-end'>
            {/* <Navbar></Navbar> */}
            <Sidebar></Sidebar>
            <Sidenav></Sidenav>
            
            <div className='max-sm:absolute max-sm:right-5 max-sm:w-[87%] w-[38em]  '>


                <div className='p-3 text-2xl flex font-bold text-white border-[1px] border-gray-700 bg-[#000000]'>
                    {localStorage.getItem("username")}
                </div>
                <div className='bg-gray-700 h-[15em] flex items-end'>
                <div className='border-[5px] border-black shadow-md mx-5 size-36 bg-blue-950 rounded-full translate-y-[4em]'>
                    <img src={localStorage.getItem("userImage")} alt="" />
                </div>


                </div>
                <div className='ml-auto text-white p-2 mt-4 text-end text-xl cursor-pointer'>Edit</div>
                <div className=' px-5 py-1  font-bold text-xl text-white'>{localStorage.getItem("username")}</div>
                <div className=' px-5 py-1 font-bold text-sm text-gray-600'>@{localStorage.getItem("username")}</div>
                <div className='  mb-2  '>
                <div className=' text-white font-bold p-2 mt-4  text-3xl '>Your Posts </div>

                </div>
               

                
                
                <div className='  border-[1px] border-gray-700'>
                    {console.log(localStorage.getItem("id"))}
                    {posts && posts.map((post, index) => {
                        console.log(post)
                        return <Post
                            key={index}
                            username={post.username}
                            post={post.post}
                            date={post.date}
                            replys={post.replys}
                            retweets={post.retweets}
                            likes={post.likes}
                            views={post.views}
                            userImage={post.userImage}
                            isVerified={post.isVerified}
                            id={post.id}
                            liked={post.likedBy} //user id from localstorage
                            userId ={post.userId}
                            getPosts={getPosts}
                            postImage={post.postImage}



                        ></Post>
                    })}

                </div>

            </div>
            <div className='mt-3 max-lg:hidden block w-[21em]'>
                <div className='flex justify-end'>

                </div>
         
                <div className='mb-5 text-white items-center p-2 flex bg-[#202327] rounded-3xl'>

                
                    <div className='px-6'><PiMagnifyingGlassLight className='text-lg text-gray-400' /></div>
                    <input placeholder='Search' className='focus:outline-none bg-[#202327] w-[100%]'></input>

                </div>

                <div className='mb-5 space-y-4 rounded-xl overflow-hidden  p-3 text-white border-[1px] border-gray-700'>
                    <div className='text-xl font-bold'>Subscribe to Premium</div>
                    <div className='text-md mt-1'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</div>
                    <button className='px-4 py-2 font-bold rounded-3xl bg-twitterBlue text-white text-sm'>Subscribe</button>
                </div>



                <div className='mt-4 space-y-1 rounded-xl text-white border-[1px] border-gray-700 p-3'>
                    <div className='text-xl font-bold'>Subscribe to Premium</div>
                    <Trend name="National_Day" where="saudi arabia" />
                    <Trend name="King_Abdullah" where="saudi arabia" />
                    <Trend name="Election Debate" where="United State" />
                    <Trend name="National_Day" where="saudi arabia" />
                </div>

                <div className='p-3 text-white mt-4 rounded-xl border-[1px] border-gray-700'>
                    <div className='text-xl font-bold'>Who to Follow</div>
                    <div>
                        <UserCard title="MIT" handle="@MIT" />
                        <UserCard title="Institute of agriculture" handle="@IOA" />
                        <UserCard title="National Aeronautics and Space Administration" handle="@NASA" />
                        <UserCard title="MIT" handle="@MIT" />
                    </div>

                </div>
                <div className='text-gray-600 text-sm p-1 text-center'>
                    Terms of Service
                    Privacy Policy
                    Cookie Policy
                    Accessibility
                    Ads info

                    More
                    © 2024 X Corp.

                </div>
            </div>

        </div>
    )
}

export default PersonalPage
