import { useEffect } from 'react';
import { useState } from 'react'
import '../styles/list.css'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';


function List() {
  const [taskData,setTaskData]=useState();
  const [selectedTask,setSelectedTask]=useState([]);
  
  var getListData=()=>null;
  useEffect(()=>{
    getListData();
  })
    getListData=async()=>{
    let list=await fetch("/api/tasks",{credentials:'include'});
    list=await list.json()
    if(list.success){
      setTaskData(list.result);
    }
    else{
      alert('Try after sometime')
    }
  }
  
  
  const deleteTask=async(id)=>{
    let item=await fetch("/api/delete/"+id,{method:'delete', credentials:'include'});
    item=await item.json()
    if(item.success){
      // console.log('Item Deleted');
      getListData();
    }
    else{
      alert('Try after sometime')
    }
  }
  const selectAll=(event)=>{
    // console.log(event.target.checked);
    if(event.target.checked){
      let items=taskData.map((item)=>item._id)
      // console.log(items);
      setSelectedTask(items)
    }
    else{
      setSelectedTask([])
    }
  }
  const selectSingleItem=(id)=>{
    // console.log(id);
    if(selectedTask.includes(id)){
      let items=selectedTask.filter((item)=>item!=id);
      setSelectedTask([items])
    }else{
      setSelectedTask([id,...selectedTask])
    }
  }
  const deleteMultiple=async()=>{
    console.log(selectedTask);
    let item=await fetch("/api/delete-multiple",
      {
        method:'delete', credentials:'include',
        body:JSON.stringify(selectedTask),
        headers:{
          'Content-Type':'Application/json'
        }
      }
    );
    item=await item.json()
    if(item.success){
      // console.log('Item Deleted');
      getListData();
    }
    else{
      alert('Try after sometime')
    }
  }
  return (
    <div className='list-container'>
      <h1>To do List</h1>
      <button onClick={deleteMultiple} className='delete-item delete-multiple'>Delete</button>
      <ul className='task-list'>
        <li className='list-header'><input onChange={selectAll} type='checkbox'/></li>
        <li className='list-header'>S.No</li>
        <li className='list-header'>Title</li>
        <li className='list-header'>Description</li>
        <li className='list-header'>Action</li>
        {
          taskData && taskData.map((item,index)=>(
            <Fragment key={item._id}>
              <li className='list-item'><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type='checkbox'/></li>
              <li className='list-item'>{index+1}</li>
        <li className='list-item'>{item.title}</li>
        <li className='list-item'>{item.description}</li>
        <li className='list-item'><button onClick={()=>deleteTask(item._id)} className='delete-item'>Delete</button>
        <Link to={"update/"+item._id} className='update-item'>Update</Link>
        </li>
            </Fragment>
          ))
        }
      </ul>
    </div>
  )
}

export default List
