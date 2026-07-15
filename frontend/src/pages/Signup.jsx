import React from 'react';
import axios from "axios"
import { setUserData } from '../../redux/userSlice';
import toast from "react-hot-toast";
import serverUrl from "../constant";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {

  const navigate = useNavigate();
  let dispatch=useDispatch()
  let {userData}=useSelector(state=>state.user)
console.log(userData)
  const [loading,setLoading]=useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handler = async (e) => {

    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        userName, email, password
      }, { withCredentials: true })
      dispatch(setUserData(result.data))
      toast.success("Signup Successfull")
      setLoading(false);
      navigate("/profile")
    }
    catch (err) {
      console.log("Handler Error");
       if(userName===""){
        toast.error("Enter UserName")
      }
      else if(email===""){
        toast.error("Enter Email")
      }
      else if(password===""){
        toast.error("Enter Password")
      }
      else{
        toast.error(err.response.data.message)
      }
      setLoading(false);
    }
  }
  return (
    <div className='bg-slate-200 w-screen h-screen flex items-center justify-center'>

      <div className='bg-white lg:h-[700px] h-[600px]  rounded-xl max-w-[500px] lg:w-[30vw]'>
        <div className='shadow-gray-400 shadow-xl  bg-blue-400 h-[200px]  rounded-b-[30%] max-w-[500px] lg:w-[30vw] flex justify-center mb-6 items-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>Welcome To <span className='text-white'> Chatly</span></h1>
        </div>
        <form onSubmit={handler} className='flex -mt-4 flex-col items-center justify-center p-2 gap-2'>
          <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} className='border-blue-400 w-[250px] lg:w-[25vw] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-3 border-2 p-4' placeholder='Enter your username'></input>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='border-blue-400 w-[250px] lg:w-[25vw] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-0  border-2 p-4' placeholder='Enter your email'></input>
          <div className=' border-blue-400 w-[250px] lg:w-[25vw] text-gray-400 text-[18px] shadow-gray-400 rounded-xl shadow-lg m-4 mt-0 border-2 p-4 flex items-center justify-between '>
            <input className='w-full h-full outline-none' value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder='Enter your password'></input>
            {showPassword ? <FaEye onClick={() => { setShowPassword(false) }} /> : <FaEyeSlash onClick={() => { setShowPassword(true) }} />}
          </div>

          <button
          disabled={loading}
            className="text-black text-[18px] hover:shadow-white cursor-pointer bg-blue-400 border-0 shadow-gray-400 w-[100px] lg:w-[10vw] rounded-xl shadow-lg m-4 mt-0 p-4"
            type="submit"
            
          >
            {loading?"Loading...":"SignUp"}
          </button>
          <p>Already Have An Account? <span className='text-blue-400 cursor-pointer' onClick={() => {
            navigate("/signin")
          }}>SignIn</span></p>
        </form>
      </div>


    </div>
  )
}

export default Signup