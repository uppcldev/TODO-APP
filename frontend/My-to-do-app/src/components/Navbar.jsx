import React, { useEffect} from 'react'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [Login, setLogin] = useState(localStorage.getItem('login'));
  const Nevigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem('login');
    setLogin(null)
    setTimeout(() => {
      Nevigate('/login');
    }, 1000);
  }
  useEffect(()=>{
    const handleStorage=()=>{
      setLogin(localStorage.getItem('login'))
    }
    window.addEventListener('localStorage-change', handleStorage)
    return ()=>{
      window.removeEventListener('localStorage-change', handleStorage)
    }
  },[])
  return (
    <nav className='navbar'>
    <div className='logo'>To Do App</div>
    <ul className='nav-links'>
      {
        Login?
        <>
        <li>
          <Link to ={'/'}>List</Link>
        </li>
        <li>
          <Link to ={'/add'}>AddTask</Link>
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
        </li>
        </>:null
      }
    </ul>
    </nav>
  )
}
export default Navbar
