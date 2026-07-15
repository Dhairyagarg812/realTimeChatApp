import React, {  useRef, useState } from 'react'
import { IoCameraOutline } from "react-icons/io5";
import dp from "../assets/dp.webp"
import axios from "axios";
import { RiLogoutCircleLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import serverUrl from "../constant";
import { setUserData } from '../../redux/userSlice';
const Profile = () => {
    let navigate=useNavigate()
    let image=useRef()
    let [saving,setSaving]=useState(false)
    let dispatch=useDispatch();
    let {userData}=useSelector(state=>state.user)
    let [name,setName]=useState(userData.name || "");
    let [frontendImage,setFrontendImage]=useState(userData.image || dp);
    let [backendImage,setBackendImage]=useState(null);

    const handleImage=(e)=>{
        let file=e.target.files[0];
        
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    
    const handleProfile=async(e)=>{
        e.preventDefault();
        setSaving(true);
        try{
            const formData=new FormData();
            formData.append("name",name);
            if(backendImage){
                formData.append("image",backendImage)
            }
            let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
            dispatch(setUserData(result.data))
            setSaving(false);
            toast.success("Changes Saved Successfully")
            navigate("/")
        }
        catch(err){
            console.log(err);
            setSaving(false);
            toast.error("Some Error Occured In Saving")

        }
    }

    return (
        <>
        
        <div className='h-[100vh] w-full bg-slate-200 flex flex-col justify-center items-center '>
        <FaLongArrowAltLeft onClick={()=>navigate("/")} className='top-[90px] text-gray-500 text-3xl cursor-pointer absolute left-[90px]'/>
        
            <div className='relative' onClick={()=>image.current.click()}>
                <img src={frontendImage} className='w-50 h-50 rounded-full bg-white shadow-gray-400 shadow-lg opacity-60 border-blue-500 border-5 ' />
                <div className="bg-blue-400 "><IoCameraOutline className='absolute bg-blue-500 rounded-full shadow-gray-400 shadow-lg w-[30px] h-[30px] p-1 cursor-pointer bottom-8 right-3 text-2xl text-gray-100 ' /></div>
            </div>
            <form onSubmit={handleProfile} className='flex flex-col items-center justify-center'>
                <input type="file" accept="image/*" hidden ref={image} onChange={handleImage} />
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' 
                  className='border-blue-400 w-[28vw] text-gray-700 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-3 border-2 p-4'   />
                <input type="text " readOnly className='border-blue-400 w-[28vw] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-3 border-2 p-4' value={userData.userName} />
                <input type="text" readOnly className='border-blue-400 w-[28vw] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-3 border-2 p-4' value={userData.email} />
                <button className=' text-black text-[18px] hover:shadow-white cursor-pointer bg-blue-400 border-0  shadow-gray-400 w-[10vw] rounded-xl shadow-lg m-4 mt-0 border-2 p-4'>{saving?"Saving...":"Save Changes"}</button>
            </form>
        </div>
        </>
    )
}

export default Profile