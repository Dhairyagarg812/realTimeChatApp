import React, {useEffect, useRef } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux';
const SenderMessages = ({ image, message }) => {
    let scroll = useRef();
    let {userData}=useSelector((state)=>state.user)
    let {selectedUser}=useSelector((state)=>state.user)
    useEffect(() => {
        scroll.current.scrollIntoView({ behaviour: "smooth" })

    }, [message, image])
    return (
        <div ref={scroll} className="flex justify-end">
            <div className='shadow-md justify-end flex flex-col  shadow-gray-400 px-6 p-2 text-2xl w-[200px] right-0 rounded-b-2xl rounded-l-2xl mt-5 m-3 bg-blue-500'>
                {image && <img className='w-[150px] mt-2 rounded-xl' src={image}></img>
                }
                {message && <span  className='text-white'>{message}</span>
                }
            </div>
            <div>
            <div
          key={selectedUser._id}
          onClick={() => dispatch(setSelectedUser(user))}
          className="
              flex p-3 pt-4
            "
        >
          <img
              src={ userData.image || dp}
              
              className="
                h-[40px] w-[40px] rounded-full object-cover
                shadow-lg shadow-gray-400
              "
            />
        </div>
            </div>
        </div>

    )
}

export default SenderMessages