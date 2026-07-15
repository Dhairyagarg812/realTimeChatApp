import axios from 'axios'
import { useEffect } from 'react'
import serverUrl from '../constant'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../../redux/userSlice'
import { setMesseges } from '../../redux/messageSlice'

const getMessage = () => {
    let{userData,selectedUser}=useSelector(state=>state.user)
    
    let dispatch=useDispatch()
  useEffect(()=>{
    const fetchMessages=async()=>{
        try{
        const result=await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,
            {withCredentials:true}
        )
        
        dispatch(setMesseges(result.data))
    }
    catch(err){
        console.log(err);
    }

    }
    fetchMessages();
  },[selectedUser?._id,dispatch])
}

export default getMessage