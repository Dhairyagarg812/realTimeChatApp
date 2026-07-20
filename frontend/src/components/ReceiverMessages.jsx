import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import dp from "../assets/dp.webp"
const ReceiverMessages = ({ image, message }) => {
  let scroll = useRef();
  let dispatch=useD
  let{userData,selectedUser}=useSelector((state)=>state.user)
  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" })

  }, [message, image])
  return (

    <div ref={scroll} className="flex justify-start">
      <div className='flex'>
      <div
          key={selectedUser._id}
          onClick={() => dispatch(setSelectedUser(user))}
          className="
              flex p-3 pt-4
            "
        >
          <img
              src={selectedUser?.image || dp}
              
              className="
                h-[40px] w-[40px] rounded-full object-cover
                shadow-lg shadow-gray-400
              "
            />
        </div>
        <div className='shadow-md flex justify-start flex-col w-[200px]  shadow-gray-400 px-6 p-2 text-2xl relative left-0 rounded-b-2xl rounded-r-2xl mt-5 m-3 bg-blue-400'>
          {image && <img className='w-[150px] mt-2 rounded-xl' src={image}></img>
          }
          {message && <span ref={scroll} className='text-white'>{message}</span>
          }

        </div>
        
      </div>
    </div>
    
  )
}

export default ReceiverMessages