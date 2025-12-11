import { useState } from 'react';
import { useEffect } from 'react';
import '../styles/addtask.css'
import { Link, useNavigate } from 'react-router-dom';

function SignUp(){
  const [userData,setUserData]=useState();
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/')
    }})

  const handleSignUp=async()=>{
    console.log(userData);
    let result=await fetch("/api/signup",{
      method:'Post',
      body:JSON.stringify(userData),
      headers:{
        'Content-Type':'Application/Json'
      }
    })
    result=await result.json()
    if(result.success){
      console.log("User signup done");
      document.cookie = "token="+result.token 
      localStorage.setItem('login', userData.email)
      navigate('/')
    }
    else{
      alert('Try after sometime')
    }
  }
  return(
    <div className="container">
      <h1>Sign Up</h1>
      <label htmlFor="">Name</label>
      <input 
      onChange={(event)=>setUserData({...userData,name:event.target.value})} 
      type="text" name="name" placeholder="Enter username"/>
      <label htmlFor="">Email</label>
      <input onChange={(event)=>setUserData({...userData,email:event.target.value})} type="text" name="email" placeholder="Enter email"/>
      <label htmlFor="">Password</label>
      <input onChange={(event)=>setUserData({...userData,password:event.target.value})} type="text" name="password" placeholder="Enter password"/>
      <button onClick={handleSignUp}>Signup</button>
      <Link className='link' to={'/login'}>Login</Link>
    </div>
  )
}
export default SignUp;
