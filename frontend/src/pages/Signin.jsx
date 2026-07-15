import React from 'react'
import toast from "react-hot-toast";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import serverUrl from '../constant';
import axios from "axios"
import { setUserData } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const Signin = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  let dispatch=useDispatch();
  const [password,setPassword]=useState("");
  let {userData}=useSelector(state=>state.user);
  console.log(userData);
  const handler=async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const result=await axios.post(`${serverUrl}/api/auth/signin`,{
        email,password
      },{withCredentials:true})
      dispatch(setUserData(result.data));
      setLoading(false)
      navigate("/")
      toast.success("Login Successful");
    }
    catch(err){
      console.log("Handler Error");
      setLoading(false)
      toast.error(err.response.data.message);

    }
  } 
   const [showPassword,setShowPassword]=useState(false);
  return (
    <div className='bg-slate-200 w-screen h-screen flex items-center justify-center'>
      
      <div className='bg-white lg:h-[700px] h-[600px] max-w-[500px]  shadow-2xl rounded-xl shadow-gray-500 lg:w-[70vh]'>
      <div className= 'shadow-gray-400 shadow-xl  bg-blue-400 h-[200px] rounded-b-[30%] max-w-[500px] lg:w-[70vh] flex justify-center mb-6 items-center'>
        <h1 className='text-gray-600 font-bold text-[30px]'>Welcome To <span className='text-white'> Chatly</span></h1>
      </div>
      <form onSubmit={handler} className='flex flex-col items-center justify-center p-2 gap-2'>
      
      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='border-blue-400 w-[250px] lg:w-[25vw] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-0  border-2 p-4' placeholder='Enter your email'></input>
      <div  className=' border-blue-400 lg:w-[25vw] w-[250px] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-0 border-2 p-4 flex items-center justify-between '>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} className='lg:w-[28vw] w-[250px] lg:h-full outline-none' type={showPassword?"text":"password"}  placeholder='Enter your password'></input>
      {showPassword?<FaEye onClick={()=>{setShowPassword(false)}} />:<FaEyeSlash onClick={()=>{setShowPassword(true)}} />}
      </div>

      <button disabled={loading} className=' text-black text-[18px] hover:shadow-white cursor-pointer bg-blue-400 border-0  shadow-gray-400 w-[100px] lg:w-[10vw] rounded-xl shadow-lg m-4 mt-0 border-2 p-4' type="submit"> {loading?"Loading...":"SignIn"}</button>
      <p>Don't Have An Account? <span className='text-blue-400 cursor-pointer' onClick={()=>{
        navigate("/signup")
      }}>SignUp</span></p>
      </form>
      </div>
     

    </div>
  )
}

export default Signin