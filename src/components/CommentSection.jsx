import React, { useEffect } from 'react'
import { LuImage } from "react-icons/lu";
import { HiOutlineGif } from "react-icons/hi2";
import { RiListRadio } from "react-icons/ri";
import { LiaSmile } from "react-icons/lia";
import { PiMapPinBold } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaEarthAfrica } from "react-icons/fa6";
import axios from "axios"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function CommentSection(props) {

   
  let [imgUrl,setImgUrl]= React.useState("")
  let [comment, setComment] = React.useState("")

  function handleCommentChange(e) {
    setComment(e.target.value)
  }
  useEffect(() => {
    getData()
  }, [])

  function getData() {
    axios.get("https://6702f908bd7c8c1ccd404dee.mockapi.io/post")
  }
  function postTweet() {
    let current_date = new Date()
    if(!localStorage.getItem("username")){
      return withReactContent(Swal).fire({
        title: "You have to login to post",
        confirmButtonText: "close",
        icon:"info"


    })
    }
    axios.post("https://6702f908bd7c8c1ccd404dee.mockapi.io/post", {
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("id"),
      post: comment,
      date: current_date,
      replys: 0,
      retweets: 0,
      likes: 0,
      views: 0,
      userImage: "https://cdn-icons-png.flaticon.com/512/9131/9131478.png",
      isVerified: false,
      likedBy: [],
      postImage:imgUrl



    }).then(res =>{
      setImgUrl("")
      setComment("")
      props.getPosts()
    })
   
  }

  function handleUrlChange(event){
    setImgUrl(event.target.value)
  }
  return (
    <div className='p-5 space-x-2   border-[1px] border-gray-700'>


      <div className='flex space-x-3'>
        <div className='size-10 bg-zinc-700 rounded-full'>
          <img src="https://cdn-icons-png.flaticon.com/512/9131/9131478.png" alt="" />
        </div>
        <textarea value={comment } onChange={handleCommentChange} className='resize-none max-w-[100%] text-white placeholder-slate-600 focus:outline-none w-[100%] align-middle text-[1.3em] bg-transparent' placeholder='Express your thoughts'></textarea>
       

      </div>
      <input value={imgUrl} onChange={handleUrlChange} className='pl-10 max-w-[100%] text-white placeholder-slate-600 focus:outline-none w-[100%] align-middle text-[1.3em] bg-transparent' placeholder='Put Optional Image  url here'></input>



      <div className='flex px-10 text-twitterBlue text-sm font-bold mb-2 items-center '><FaEarthAfrica className="text-twitterBlue me-2" />Everyone Can Reply</div>
      <div className='px-5'>
        <div className=' pt-3   flex border-t-gray-700 border-t-[1px]'>
          <div className='flex space-x-3'>

            <LuImage className="text-lg font-bold text-twitterBlue" />
            <HiOutlineGif className="text-lg font-bold text-twitterBlue" />
            <RiListRadio className="text-lg font-bold text-twitterBlue" />
            <LiaSmile className="text-lg font-bold text-twitterBlue" />
            <RiCalendarScheduleLine className="text-lg font-bold text-twitterBlue" />
            <PiMapPinBold className="text-lg font-bold text-twitterBlue" />
          </div>
          <div className='flex ml-auto flex-wrap'>

            <div className='py-1 px-4 font-bold rounded-3xl  text-white ml-auto'
              style={
                comment.length > 150 ?
                  comment.length > 200 ? { color: "#ee0303", transform: "scale(1.2)" } : { color: "#eb9e03" }
                  :
                  { color: "#1d9bf0 " }

              }

            >{comment.length}/200</div>
            <button onClick={postTweet} className='mx-2 py-1 px-4 font-bold rounded-3xl bg-twitterBlue text-white'
              style={comment&& (comment.length<200 && comment.length >0)  ? { backgroundColor: "#1d9bf0" } : { opacity: "0.5", pointerEvents: "none" }}
            >Post</button>

          </div>


        </div>
      </div>


    </div>
  )
}

export default CommentSection
