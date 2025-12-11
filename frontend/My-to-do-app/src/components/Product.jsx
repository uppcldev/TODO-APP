import { useEffect } from 'react';
import { useState } from 'react'
import '../styles/Products.css'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';


function Prduct() {
  const [taskData,setTaskData]=useState();
  var getListData=()=>null;
  useEffect(()=>{
    getListData();
  })
    getListData=async()=>{
    let list=await fetch("/api/products",{credentials:'include'});
    list=await list.json()
    if(list.success){
      setTaskData(list.result);
    }
    else{
      alert('Try after sometime')
    }
  }
  
  return (
    <div className='list-container'>
      <h1>Product List</h1>
      <ul className='product-list'>
        <li className='list-header'>S.No</li>
        <li className='list-header'>Title</li>
        <li className='list-header'>Description</li>
        {
          taskData && taskData.map((item,index)=>(
            <Fragment key={item._id}>
            <li className='list-item'>{index+1}</li>
            <li className='list-item'>{item.name}</li>
            <li className='list-item'>{item.description}</li>
            </Fragment>
          ))
        }
      </ul>
    </div>
  )
}

export default Prduct
