import { useState } from 'react';
import '../styles/addtask.css'
import { useNavigate } from 'react-router-dom';
function AddTask(){
  const [taskData,setTaskData]=useState();
  const navigate=useNavigate();
  const handleAddTask=async()=>{
    console.log(taskData);
    let result=await fetch("/api/add-task",{
      method:'Post', credentials:'include',
      body:JSON.stringify(taskData),
      headers:{
        'Content-Type':'Application/Json'
      }
    })
    console.log("daklfalf")
    
    result=await result.json()
    console.log(result)
    if(result){
      navigate('/')
      console.log("New Task added");
    }else{
      alert('try after some time')
    }

  }
  return(
    <div className="container">
      <h1>Add New Task</h1>
      
        <label htmlFor="">Title</label>
        <input onChange={(event)=>setTaskData({...taskData, title:event.target.value})} type="text" name="title" placeholder="Enter Task Title"/>
        <label htmlFor="">Description</label>
        <textarea onChange={(event)=>setTaskData({...taskData, description:event.target.value})} rows={4} name="description" placeholder="Enter Task Description"></textarea>
        <button onClick={handleAddTask}>Add New Task</button>
      
    </div>
  )
}
export default AddTask;





// import { useState } from 'react';
// import '../styles/addtask.css'
// import { useNavigate } from 'react-router-dom';

// function AddTask(){
//   const [taskData,setTaskData]=useState({ title: '', description: '' });
//   const navigate=useNavigate();

//   const handleChange = (e) => {
//     setTaskData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleAddTask=async(e)=>{
//     e.preventDefault();
//     try {
//       const result=await fetch("http://localhost:3200/add-task",{
//         method:'Post', credentials:'include',
//         body:JSON.stringify(taskData),
//         headers:{
//           'Content-Type':'application/json'
//         }
//       })
//       const res=await result.json()
//       // Check if the task was created successfully on the backend
//       if(res._id){
//         navigate('/')
//         console.log("New Task added");
//       } else {
//         // Handle cases where the backend returns an error message
//         alert(res.message || "Could not add task.");
//       }
//     } catch (error) {
//       console.error("Failed to add task:", error);
//       alert("Failed to add task. See console for details.");
//     }
//   };
//   return(
//     <div className="container">
//       <h1>Add New Task</h1>
//       <form onSubmit={handleAddTask}>
//         <label htmlFor="title">Title</label>
//         <input onChange={handleChange} value={taskData.title} type="text" name="title" placeholder="Enter Task Title"/>
//         <label htmlFor="description">Description</label>
//         <textarea onChange={handleChange} value={taskData.description} rows={4} name="description" placeholder="Enter Task Description"></textarea>
//         <button type="submit">Add New Task</button>
//       </form>
//     </div>
//   )
// }
// export default AddTask;
