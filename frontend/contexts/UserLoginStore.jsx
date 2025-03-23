import UserLoginContext from "./UserLoginContext";
import React from 'react'
import { useState } from "react";

function UserLoginStore({children}) {
    let [user, setUser] = useState([]);
    let [photo, setPhoto] = useState({photosrc : null});
    let [busPassRegister, setBusPassRegister] = useState({});
    let busPassRegisterStatus = false;
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    let [passStatus, setPassStatus] = useState(true)

    async function loginUser(userData){
      let res = await fetch(`https://buslink-fullstack.onrender.com/user-api/login`,
          {
          method :"post",
          headers : {"Content-type" : "application/json"},
          body : JSON.stringify(userData)
          }
      );
      let data = await res.json();
      console.log("in login store")
      console.log(data)
      if(data.message === "login success"){
          setUser(data.users)
          setUserLoginStatus(true);
          sessionStorage.setItem('token', data.token)
          console.log("after set user");
          passStatus = true;
          //navigate('/user-profile')
      }else{
          setUser({})
          passStatus = false;
      }
  }

  function logoutUser(){
      console.log('logout pressed');
      setUserLoginStatus(false)
      setUser({})
      sessionStorage.removeItem('token')
      localStorage.removeItem("username")
  }

  return (
    <UserLoginContext.Provider value={{user,loginUser, 
    userLoginStatus, setUserLoginStatus,logoutUser, setUser,
     busPassRegister, setBusPassRegister, photo, setPhoto, busPassRegisterStatus}}>
        {children}
    </UserLoginContext.Provider>
  )
}

export default UserLoginStore