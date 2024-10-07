import React from 'react'

function UserCard(props) {
  return (
    <div className='flex mt-3'>
        <div className=' max-w-[2.5em] max-h-[2.5em] min-w-[2.5em] min-h-[2.5em] bg-blue-500 rounded-full '></div>
        <div className='px-3'>
            <h2 className='text-md'>{props.title}</h2>
            <h2 className='text-dm text-gray-600'>{props.handle}</h2>
          
        </div>
        <div>  
            
        </div>
        <button className='rounded-3xl py-1 px-4 font-bold mb-auto flex ml-auto bg-gray-300 text-black'>Follow</button>

    </div>
  )
}

export default UserCard
