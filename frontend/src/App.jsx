
import { Navigate, Route, Routes } from "react-router-dom"
import Logout from './pages/Logout'
import Signup from './pages/Signup'
import Signin from "./pages/Signin"
import getCurrentUser from "./customHooks/getCurrentUser"
import { useDispatch, useSelector } from "react-redux"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import getOtherUser from "./customHooks/getOtherUser"
import {io} from "socket.io-client"
import { useEffect } from "react"
import serverUrl from "./constant"
import { setOnlineUsers, setSocket } from "../redux/userSlice"
function App() {
  getCurrentUser()
  getOtherUser()
  let dispatch=useDispatch()
  let {userData,socket,onlineUsers}=useSelector(state=>state.user);
  useEffect(()=>{
    if(userData){
    const socketio=io(`${serverUrl}`,{
      query:{
        userId:userData?._id
      }
    })
    dispatch(setSocket(socketio))
    socketio.on("getOnlineUsers",(users)=>{
      dispatch(setOnlineUsers(users))
    })
    return ()=> socketio.close}
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
    }
    
  },[userData])
  return (
    <Routes>
      <Route path="/" element={userData?<Home/>:<Navigate to="/signin"/>}/>
      <Route path="/signup" element={userData?<Navigate to="/profile" />:<Signup />}></Route>
      <Route path="/signin" element={userData?<Navigate to="/" />:<Signin />}></Route>
      <Route path="/profile" element={userData?<Profile/>:<Navigate to="/signup"/>}/>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  )
}

export default App
