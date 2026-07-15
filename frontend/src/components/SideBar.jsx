import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdSearch } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import dp from "../assets/dp.webp";
import serverUrl from "../constant";
import {
  setOtherUsers,
  setUserData,
  setSelectedUser,
} from "../../redux/userSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchArray,setSearchArray]=useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { userData, otherUsers, onlineUsers, selectedUser } = useSelector(
    (state) => state.user
  );
  const handleSearch=async()=>{

    try{
      const result=axios.get(`${serverUrl}/api/user/search?query=${searchValue}`,{}
        ,{withCredentials:true}
      )
      setSearchArray(result.data )
      toast.success("Here are your searched users")
    }
    catch(err){
      toast.error("Something went wrong!");
    }

  }

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
      dispatch(setUserData(null));

      console.log(result.data);
      navigate("/signin");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const filteredUsers = otherUsers?.filter((user) => {
    const name = user?.name || user?.userName || "";

    return name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div
      className={`
        relative h-full w-full flex-col overflow-hidden bg-slate-200
        lg:w-[30%]
        ${selectedUser ? "hidden lg:flex" : "flex"}
      `}
    >
      {/* Blue profile section */}
      <div
        className="
          relative z-10  h-[40%] min-h-[310px] w-full shrink-0
          rounded-b-[30%] bg-blue-400
          flex flex-col
          shadow-[0_14px_15px_-12px_rgba(0,0,0,0.45)]
        "
      >
        <h1 className="ml-6 mt-[50px] text-4xl font-bold text-white">
          Chatly
        </h1>

        <div className="mx-6 mt-2 mb-3 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-700">
            Hii, {userData?.name || userData?.userName}
          </h1>

          <img
            onClick={() => navigate("/profile")}
            src={userData?.image || dp}
            alt="Profile"
            className="
              h-[80px] w-[80px] cursor-pointer rounded-full object-cover
              shadow-lg shadow-gray-500
            "
          />
        </div>

        {!showSearch ? (
          <div className="ml-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="
                flex h-[50px] w-[50px] shrink-0 items-center justify-center
                rounded-full bg-white text-3xl
                shadow-lg shadow-gray-500
              "
            >
              <MdSearch />
            </button>

            <div
              className="
                flex items-center  overflow-x-auto pr-4
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              <div className="[scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden overflow-x-auto p-4">
                {otherUsers?.map((user) => (
                  onlineUsers?.includes(user?._id) &&
                  <div className=" relative">
                    <span className="bg-green-400 shadow-gray-400 shadow-3xl right-0 bottom-2 absolute rounded-full w-[10px] h-[10px]"></span>
                    <img
                      key={user._id}
                      onClick={() => dispatch(setSelectedUser(user))}
                      src={user?.image || dp}
                      alt={user?.name || user?.userName}
                      className="
                
                  h-12 w-12  cursor-pointer rounded-full
                  border-2 border-white object-cover
                   shadow-gray-500 shadow-lg
                "
                    />
                  </div>


                ))}
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              mx-6 flex h-[50px] items-center rounded-full bg-white
              shadow-lg shadow-gray-500
            "
          >
            <MdSearch className="ml-4 shrink-0 text-3xl" />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search users..."
              className="min-w-0 flex-1 px-3 text-lg outline-none"
            />

            <RxCross1
              onClick={() => {
                setShowSearch(false);
                setSearchValue("");
              }}
              className="mr-4 cursor-pointer text-2xl font-bold"
            />
          </form>
        )}
      </div>

      {/* Users list */}
      <div
        className="
          z-0 flex min-h-0 flex-1 flex-col gap-4
          overflow-y-auto px-5 pt-12 pb-[100px]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {searchArray.length>0?searchArray:filteredUsers?.map((user) => (
          
          <div
            key={user._id}
            onClick={() =>{ dispatch(setSelectedUser(user))
              setSearchArray([]);
              setShowSearch(false)
              setSearchValue("")
            }}
            className="
              flex min-h-[60px] w-full shrink-0 cursor-pointer
              items-center gap-4 rounded-full bg-white
              shadow-lg shadow-gray-400 relative
              transition hover:bg-[#afd2ed]
            "
          >
            {onlineUsers?.includes(user._id)&&   
                   <span className="bg-green-400 shadow-gray-400 shadow-3xl left-[50px] 
                   bottom-2 absolute rounded-full 
                   w-[10px] h-[10px]"></span>
            }
            <img
              src={user?.image || dp}
              alt={user?.name || user?.userName}
              className="
                h-[60px] w-[60px]  rounded-full object-cover
                shadow-lg shadow-gray-500
              "
            />

            <h2 className="truncate pr-4 text-[20px] font-semibold">
              {user?.name || user?.userName}
            </h2>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="
          absolute bottom-6 left-6 z-20
          flex h-[50px] w-[50px] items-center justify-center
          rounded-full bg-blue-400
          shadow-lg shadow-gray-500
        "
      >
        <RiLogoutCircleLine className="text-2xl" />
      </button>
    </div>
  );
};

export default SideBar;