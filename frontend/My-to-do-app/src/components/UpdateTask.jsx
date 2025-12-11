import { useEffect, useState } from 'react';
import '../styles/addtask.css'
import { useNavigate, useParams } from 'react-router-dom';
function UpdateTask(){
  const [taskData,setTaskData]=useState();
  const navigate=useNavigate();
  const {id}=useParams()
  var getTask=()=>null;
  useEffect(()=>{getTask(id)})
  getTask=async(id)=>{
    let task=await fetch('/api/task/'+id, {credentials:'include'});
    task=await task.json()
    if(task.result){
      setTaskData(task.result)
    }
  }
  const updateTask=async()=>{
    console.log('function called',taskData);
    let task=await fetch("/api/update-task",{
      method:'put', credentials:'include',
      body:JSON.stringify(taskData),
      headers:{
        'Content-Type':'Application/Json'
      }
    });
    task=await task.json()
    if(task){
      navigate('/')
    }
    else{
      alert('Try after sometime')
    }
  }
  return(
    <div className="container">
      <h1>Update Task</h1>
      
        <label htmlFor="">Title</label>
        <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData, title:event.target.value})} type="text" name="title" placeholder="Enter Task Title"/>
        <label htmlFor="">Description</label>
        <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData, description:event.target.value})} rows={4} name="description" placeholder="Enter Task Description"></textarea>
        <button onClick={updateTask} className='submit'>Update Task</button>
      
    </div>
  )
}
export default UpdateTask;
