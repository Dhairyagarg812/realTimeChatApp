import React, { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoArrowBackOutline } from "react-icons/io5";
import dp from "../assets/dp.webp";
import { FaRegImage } from "react-icons/fa";
import { setSelectedUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiEmojiStickerLine } from "react-icons/ri";
import { BiSend } from "react-icons/bi";
import SenderMessages from "./SenderMessages";
import ReceiverMessages from "./ReceiverMessages";
import serverUrl from "../constant"
import axios from "axios"
import { useEffect } from "react";
import { setMesseges } from "../../redux/messageSlice";
const MessageArea = () => {
  const [value,setValue]=useState("")
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser,userData,socket } = useSelector((state) => state.user);
  const handleEmoji=(emojiObject) => {setValue((previous)=>previous+emojiObject.emoji)
    setShowPicker(false)

  }
  let {messages}=useSelector(state=>state.message)
  let image=useRef()
  let[frontendImage,setFrontendImage]=useState("")
  let[backendImage,setBackendImage]=useState("")
  let handleSendMessage=async(e)=>{
    try{
      e.preventDefault()
      let formData=new FormData();
      formData.append("message",value);
      if(backendImage){
        formData.append("image",backendImage)
      }
      const result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`
        ,formData
        ,{withCredentials:true});
        dispatch(setMesseges([...messages,result.data ]))
        setBackendImage("")
        setFrontendImage("")
        setValue("")
    }
    catch(err){
      console.log(`Error in Handle Send Message ${err.response.data}`)
    }
  }
  const handleImage=async(e)=>{
    let file=e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file))
  }
  useEffect(()=>{
    socket.on("newMessage",(mess)=>{
      dispatch(setMesseges([...messages,mess]))
      
    })
    return ()=>socket.off("newMessage")
  },[messages,setMesseges])
  return (
    
    <div
      className={`relative h-full w-full lg:w-[70%] border-l-2 border-gray-300 bg-slate-200
      ${selectedUser ? "flex flex-col" : "hidden lg:block"}`}
    >
      {selectedUser ? (
        <>
          {/* Header */}
          <div className="h-[100px] w-full shrink-0 flex items-center rounded-b-[10px] bg-blue-400 shadow-lg shadow-gray-400">
            <div className="ml-4 sm:ml-7 flex items-center gap-3">
              <IoArrowBackOutline
                onClick={() => dispatch(setSelectedUser(null))}
                className="cursor-pointer text-3xl text-white "
              />

              <img
                src={selectedUser?.image || dp}
                alt={selectedUser?.name || selectedUser?.userName}
                className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-lg shadow-gray-500"
              />

              <h2 className="text-lg sm:text-xl text-white">
                {selectedUser?.name || selectedUser?.userName}
              </h2>
            </div>
          </div>

          {/* Messages section */}
          <div className="[scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden overflow-auto mb-[100px]">
          {messages?.map((m)=>
              m.sender==userData._id?<SenderMessages image={m.image} message={m.message} />:<ReceiverMessages image={m.image} message={m.message}/>
            )}
            </div>
          <div className="flex flex-col overflow-auto  ">
            {/* Messages will come here */}
            
            
            
          
          </div>

          {/* Message input */}
          <div className="absolute  bottom-0 left-0 flex h-[100px] w-full items-center justify-center px-3">
            {showPicker && (
              <div className="absolute bottom-[90px] left-3 z-50">
                <EmojiPicker searchDisabled onEmojiClick={handleEmoji} />
              </div>
            )}
            
            {frontendImage&&<div className="flex justify-end">
              <img src={frontendImage} className="w-[100px] absolute right-[12%] bottom-[100px] rounded-xl shadow-lg shadow-gray-400"></img>
              </div>}
            <form onSubmit={handleSendMessage} className=" shadow-xl shadow-gray-400 flex h-[60px] w-full max-w-[1000px] items-center gap-3 rounded-full bg-blue-400 px-5">
              <button
                type="button"
                onClick={() => setShowPicker((previous) => !previous)}
              >
                <RiEmojiStickerLine  className="cursor-pointer text-2xl text-white" />
              </button>
              <input type="file" onChange={handleImage} accept="image/*" hidden ref={image}></input>
              <input
                placeholder="Message"
                onChange={(e)=>setValue(e.target.value)}
                type="text" value={value}
                className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white"
              />

              <button onClick={()=>image.current.click()} type="button">
                <FaRegImage className="cursor-pointer text-2xl text-white" />
              </button>

              <button type="submit">
                <BiSend className="cursor-pointer text-2xl text-white" />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-10">
          <h1 className="text-4xl lg:text-6xl text-gray-700">
            Welcome To Chatly
          </h1>
          <h2 className="text-2xl lg:text-3xl text-gray-700">
            Chat Friendly!
          </h2>
        </div>

      )}
      
    </div>
  );
};

export default MessageArea;