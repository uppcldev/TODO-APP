import { useState } from 'react';
import { useEffect } from 'react';
import '../styles/addtask.css'
import { Link, useNavigate } from 'react-router-dom';

function Login(){
  const [userData,setUserData]=useState();
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/')
    }})
  const handleLogin=async()=>{
    console.log(userData);
    let result=await fetch("/api/login",{method:'Post',
    body:JSON.stringify(userData),
    headers:{
      'Content-Type':'Application/Json'
    }
  })
    result=await result.json()
    if(result.success){
      console.log("User login done");
      document.cookie = "token="+result.token 
      localStorage.setItem('login', userData.email)
      window.dispatchEvent(new Event('localStorage-change'))
      navigate('/')
    }else{
      alert('Try after sometime')
    }
  }
  return(
    <div className="container">
      <h1>Login</h1>
      <label htmlFor="">Email</label>
      <input onChange={(event)=>setUserData({...userData,email:event.target.value})} type="text" name="email" placeholder="Enter email"/>
      <label htmlFor="">Password</label>
      <input onChange={(event)=>setUserData({...userData,password:event.target.value})} type="text" name="password" placeholder="Enter password"/>
      <button onClick={handleLogin}>Login</button>
      <Link className='link' to={'/signup'}>Sign up</Link>
    </div>
  )
}
export default Login;
