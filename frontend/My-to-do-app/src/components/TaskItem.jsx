import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function TaskItem({ task, index, onSelectItem, isSelected, onDeleteItem }) {
  return (
    <Fragment>
      <li className='list-item'>
        <input onChange={() => onSelectItem(task._id)} checked={isSelected} type='checkbox' />
      </li>
      <li className='list-item'>{index + 1}</li>
      <li className='list-item'>{task.title}</li>
      <li className='list-item'>{task.description}</li>
      <li className='list-item'>
        <button onClick={() => onDeleteItem(task._id)} className='delete-item'>Delete</button>
        <Link to={"update/" + task._id} className='update-item'>Update</Link>
      </li>
    </Fragment>
  );
}
export default TaskItem;