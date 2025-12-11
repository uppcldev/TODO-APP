import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask.jsx'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Protected from './components/Protected'
import Product from './components/Product.jsx'

// import React from 'react'

export default function Router() {
  return (
      <Routes>
          <Route path='/' element={<Protected><List/></Protected>}></Route>
          <Route path='/add' element={<Protected><AddTask/></Protected>}></Route> 
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/update/:id' element={<Protected><UpdateTask/></Protected>}></Route>
          <Route path='/product' element={<Protected><Product/></Protected>}></Route>
      </Routes>
  )
}
