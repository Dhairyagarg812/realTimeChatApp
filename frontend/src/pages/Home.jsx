import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import getMessage from '../customHooks/getMessage'

const Home = () => {
  getMessage()
  return (
    <div className='flex w-screen h-screen bg-slate-200 justify-center items-center'>
    <SideBar/>
    <MessageArea/>
    </div>
  )
}

export default Home