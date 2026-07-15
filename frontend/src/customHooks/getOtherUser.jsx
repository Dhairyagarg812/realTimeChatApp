import axios from 'axios'
import { useEffect } from 'react'
import serverUrl from '../constant'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../../redux/userSlice'

const getOtherUser = () => {
    let{userData}=useSelector(state=>state.user)
    let dispatch=useDispatch()
  useEffect(()=>{
    const fetchUser=async()=>{
        try{
        const result=await axios.get(`${serverUrl}/api/user/others`,
            {withCredentials:true}
        )
        
        dispatch(setOtherUsers(result.data))
    }
    catch(err){
        console.log(err);
    }

    }
    fetchUser();
  },[dispatch,userData])
}

export default getOtherUser