import React from 'react'

function Trend(props) {
  return (
    <div>
       <div className='text-gray-500 text-sm'>Trending in {props.where}</div>
                    <div className='text-end'>
                        #{props.name}
                    </div>

                    
    </div>
  )
}

export default Trend
