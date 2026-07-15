import axios from 'axios'
import { useEffect } from 'react'
import serverUrl from '../constant'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../redux/userSlice'

const getCurrentUser = () => {
    let{userData}=useSelector(state=>state.user)
    let dispatch=useDispatch()
  useEffect(()=>{
    const fetchUser=async()=>{
        try{
        const result=await axios.get(`${serverUrl}/api/user/current`,
            {withCredentials:true}
        )
        dispatch(setUserData(result.data))
    }
    catch(err){
        console.log(err);
    }

    }
    fetchUser();
  },[dispatch ])
}

export default getCurrentUser