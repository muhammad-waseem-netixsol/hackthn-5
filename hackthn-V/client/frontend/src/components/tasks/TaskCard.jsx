import React from 'react';

const TaskCard = (props) => {
    const onChangeStatus = (e, id)=> {
        props.onStatusChangeHandle(e, id);
    };
    const onDelete = (id) => {
        props.onDeleteFromCard(id);
    };
    return (
        <div className="rounded-lg w-full bg-gray-800 p-5 my-3">
        <div className="flex justify-between flex-col sm:flex-row">      
        <div>{props.task.title}<span className="text-red-500">({props.task.priority})</span></div>
        <div>
        <select value={props.task.status} onChange={()=> onChangeStatus(event, props.task._id)} className="outline-none bg-blue-500 cursor-pointer text-white">
        <option value="TODO">TODO</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="PENDING">PENDING</option>
        </select></div>
          </div>
          <div className="flex justify-between gap-5 my-5 flex-col sm:flex-row">
            <div className="italic">Created by : <span>{props.task.date}</span></div>
            <div className="italic">Deadline : <span>{props.task.dueDate}</span></div>
            <div className="italic">Today : <span>{new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}</span></div>
            <div className="italic"> <i className="mr-5 fa-solid fa-trash text-red-400 cursor-pointer" onClick={()=>onDelete(props.task._id)}></i></div>
          </div>
      </div>
    );
}

export default TaskCard;
