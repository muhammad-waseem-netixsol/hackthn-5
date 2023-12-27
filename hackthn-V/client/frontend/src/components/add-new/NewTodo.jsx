import React, {useEffect, useRef, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useTaskStore from '../store/tasksStore';
import toast from "react-hot-toast";


const NewTodo = () => {
    const navigate = useNavigate();
    const {isLoading, error, addTodo, added} = useTaskStore();
    let token;
    useEffect(()=> {
        token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
        if(added){
            navigate("/tasks")
        }
       
    },[error,isLoading])
    const [todo, setTodo] = useState({
        title: "",
        priority: "HIGH",
        status: "TODO",
    });
    const [tags, setTags] = useState([]);
    const onTagsChange = (event)=> {
        const value = event.target.value;
        const tags = value.split(" ");
        setTags(tags);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTodo({
          ...todo,
          [name]: value,
        });
      };
    const onAddTodo = async(event) => {
        event.preventDefault();
        if(todo.title.trim() === "" || todo.priority.trim() === ""){
            return toast.error("Fields can not be empty!!")
        }
        await addTodo({
           title: todo.title,
           priority: todo.priority,
           status: todo.status,
           tags  
        }, token)
    };
    return (
        <div className=''>
            <h1 className='text-center py-5'>ADD TODO</h1>
           <form className='max-w-[500px] flex gap-3 flex-col mx-auto' onSubmit={onAddTodo}>
            <label htmlFor="">Enter Title...</label>
                <input onChange={handleInputChange} className='outline-none border py-2 px-2 block w-full' type="text" placeholder='Enter title...' name='title'/>
                <label htmlFor="">Set Priority (DEFAULT "High")</label>
                <select onChange={handleInputChange} className='border py-2' name="priority" id="prior">
                    <option value="HIGH">High</option>
                    <option value="LOW">Low</option>
                    <option value="MED">Medium</option>
                </select>
                <label htmlFor="">Set Status</label>
                <select onChange={handleInputChange} className='border py-2' name="status" id="prior">
                    <option value="TODO">Todo</option>
                </select>
                <label htmlFor="">Tags</label>
                <input onChange={onTagsChange} className='outline-none border py-2 px-2 block w-full' type="text" placeholder='Write tags seperated by " "' />
                <button  className='border w-full py-2 cursor-pointer hover:bg-slate-100 flex justify-center items-center gap-4' type="submit">Add New Todo {isLoading && <i className="fa-solid fa-spinner animate-spin"></i>}</button>
           </form>
        </div>
    );
}

export default NewTodo;
