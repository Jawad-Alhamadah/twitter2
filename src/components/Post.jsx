import React, { useEffect, useRef } from 'react'
import { BiRepost } from "react-icons/bi";
import { RiShare2Line } from "react-icons/ri";
import { IoChatboxOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { ImSad } from "react-icons/im";

import { AiOutlineMuted } from "react-icons/ai";
import { IoMdFlag } from "react-icons/io";
import { RiCodeSSlashLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { PiNoteLight } from "react-icons/pi";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from 'axios';


function Post(props) {



  function showDate(post_date) {
    console.log(post_date)
    // date example "2024-04-18T16:00:33"
    //('2014-01-01 10:11:55')
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()


    let post_time = post_date.split("-")
    let postDay = post_time[2].split("T")[0]
    let postMonth = post_time[1]
    let postYear = post_time[0]

    let HMS = post_time[2].split(":")
    console.log(HMS)
    let post_hours = HMS[0].split("T")[1]

    let post_minutes = HMS[1]
    let post_seconds = HMS[2].split(".")[0]

    let new_Date = new Date(`${postYear}-${postMonth}-${postDay} ${post_hours}:${post_minutes}:${post_seconds}`)
    let new_Date2 = new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)

    const diffTime = Math.abs(new_Date - new_Date2);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 60 * 60));

    if (diffTime / 1000 / 60 / 60 / 24 / 30 / 365 > 1) return (Math.floor(diffTime / 1000 / 60 / 60 / 24 / 30 / 365) + `years ago}`)
    if (diffTime / 1000 / 60 / 60 / 24 / 30 > 1) return (Math.floor(diffTime / 1000 / 60 / 60 / 24 / 30) + `months ago}`)
    if (diffTime / 1000 / 60 / 60 / 24 > 1) return (Math.floor(diffTime / 1000 / 60 / 60 / 24) + `days ago`)
    if (diffTime / 1000 / 60 / 60 > 1) return (Math.floor(diffTime / 1000 / 60 / 60) + `hours ago`)
    if (diffTime / 1000 / 60 > 1) return (Math.floor(diffTime / 1000 / 60) + `minutes ago`)
    if (diffTime / 1000 > 1) return (Math.floor(diffTime / 1000) + `seconds ago`)


  }






  let [liked, setLiked] = React.useState(props.liked.includes(localStorage.getItem("id")))
  let [toggleDelete, setToggleDelete] = React.useState(false)



  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggleDelete(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

  }, []);






  function handleLiked() {
    setLiked(true)

    //localstorage
    axios.get("https://6702f908bd7c8c1ccd404dee.mockapi.io/post/" + props.id)
      .then(res => {
        console.log(res.data.likedBy)
        axios.put("https://6702f908bd7c8c1ccd404dee.mockapi.io/post/" + props.id, {
          likedBy: [...res.data.likedBy, localStorage.getItem('id')],
          likes: props.likes + 1
        })
      })
  }


  function handleDelete() {
    //get from localstorage

    withReactContent(Swal).fire({
      title: "Are You sure you want to delete?",
      showCancelButton: true,
      cancelButtonText: "cancel",
      confirmButtonColor: "red",
      confirmButtonText: "Delete"


    }).then(res => {
      if (res.isConfirmed) {


        if (props.userId === localStorage.getItem('id')) axios.delete(`https://6702f908bd7c8c1ccd404dee.mockapi.io/post/${props.id}`)
          .then(res => props.getPosts())
      }
    })
    console.log(props.id)



  }
  function handleUnLiked() {

    axios.get("https://6702f908bd7c8c1ccd404dee.mockapi.io/post/" + props.id)
      .then(res => {
        let likedBy = res.data.likedBy
        console.log(likedBy)
        likedBy.splice(likedBy.indexOf(localStorage.getItem("id")), 1) 
        console.log(likedBy)
        axios.put("https://6702f908bd7c8c1ccd404dee.mockapi.io/post/" + props.id, {
          likedBy: likedBy,
          likes: props.likes -1
        })
      })

    setLiked(false)
  }

  function handleToggle() {

    setToggleDelete(prev => {
      return !prev
    })
  }

  return (
    <div className='flex p-3 text-white justify-center'>
      <div className=''>
        <div className='size-9 rounded-full bg-blue-950'>
          <img src={props.userImage} alt="ooops image" />
        </div>
      </div>
      <div className='ml-2 w-[85%] justify-center'>
        <div className='ml-2 flex items-center '>
          <div className=' flex flex-wrap space-x-2'>

            <div>{props.username}</div>
            <div>{props.isVerified ? "blue" : ""}</div>
            <div className='flex items-center'><FaXTwitter /></div>
            <div className='text-gray-500'>@{props.username}</div>
            <div className='text-gray-500'>.</div>
            <div className='text-gray-500'>{showDate(props.date)}</div>
          </div>
          <div className='flex ml-auto'>
            <div onClick={handleToggle} className='relative ml-auto duration-300 cursor-pointer hover:bg-slate-900 rounded-full flex justify-center items-center size-8'>
              <HiOutlineDotsHorizontal />
              <div className='text-white   '
                style={toggleDelete ? {
                  display: "block", position: "absolute", top: "0px", left: "0px",
                  translate: " -100% 10%", zIndex: 5
                } : { display: "none" }}
              >
                <div ref={ref} className='flex flex-col max-sm:w-[15em] w-[20em] p-3 bg-black rounded-md border-[1px] border-[#555555] '>

                  <h1 className='flex items-center space-x-2'><ImSad /> <span>Not interested in this post</span></h1>
                  <h1 className='flex items-center space-x-2'><FiUserPlus /> <span>Follow @User</span></h1>
                  <h1 className='flex items-center space-x-2'><PiNoteLight /><span>Add/remove @User from Lists</span>   </h1>
                  <h1 className='flex items-center space-x-2'><IoVolumeMuteOutline /><span>  Block @User</span> </h1>
                  <h1 className='flex items-center space-x-2'><MdBlock /><span>Mute @User</span>   </h1>
                  <h1 className='flex items-center space-x-2'><VscGraph /><span> View post engagements</span>  </h1>
                  <h1 className='flex items-center space-x-2'><RiCodeSSlashLine /><span> Embed post</span>  </h1>
                  <h1 className='flex items-center space-x-2'><IoMdFlag /><span> Report post</span>  </h1>
                  <h1 className='flex items-center space-x-2'><AiOutlineMuted /><span>Request Community Note</span>   </h1>

                  <button
                    style={props.userId === localStorage.getItem("id") ? { display: "block" } : { display: "none" }}
                    onClick={handleDelete} className='mt-1 self-center hover:bg-red-600 hover:text-white text-sm rounded-3xl px-4 py-1 border-[1px] border-red-600 text-red-600  text-center font-bold'>
                    Delete
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <h3 className='ml-2'>{props.post}</h3>
        <div className=' m-2 w-[95%] '>
          <img className='border-[1px] border-gray-700 rounded-xl w-[100%] object-contain max-h-[500px] ' src={props.postImage} alt="oops image" />

        </div>
        <div className=' text-gray-600 my-2 flex justify-between w-[95%]'>
          <div className='flex space-x-1 justify-center items-center '><IoChatboxOutline className="cursor-pointer " /><span>{props.reply > 0 ? props.replys : ""}</span> </div>
          <div className='flex space-x-1 justify-center items-center '> <BiRepost className="cursor-pointer text-2xl" /><span>{props.retweets > 0 ? props.retweets : ""}</span></div>
          <div className='flex space-x-1 justify-center items-center '>
            {console.log(liked)}
            {liked ?
              <FaHeart className="duration-300 scale-110 cursor-pointer text-red-500" onClick={handleUnLiked} />
              :
              <FaRegHeart onClick={handleLiked} className="cursor-pointer " />
            }
            <span>{props.likes > 0 ? props.likes : ""}</span>
          </div>

          <div className='flex space-x-1 justify-center items-center '> <FaRegChartBar className="cursor-pointer " /><span>{props.views > 0 ? props.views : ""}</span></div>
          <div className='flex'>
            <HiOutlineBookmark className="cursor-pointer text-lg" />
            <RiShare2Line className="cursor-pointer text-lg" />
          </div>


        </div>
      </div>

    </div>
  )
}

export default Post
